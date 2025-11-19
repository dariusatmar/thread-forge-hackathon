import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { zip, hours = 24 } = body;

    if (!zip) {
      return NextResponse.json(
        { error: 'ZIP code is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Calculate time filter
    const timeFilter = new Date(Date.now() - hours * 60 * 60 * 1000);

    console.log(`Generating initial summary for ZIP ${zip}, time filter: ${timeFilter.toISOString()}`);

    // Fetch transcripts for this outage
    const query = `
      SELECT
        cd.call_id,
        cd.customer_id,
        cd.startdatetime,
        cd.enddatetime,
        td.transcript,
        c.location as customer_location
      FROM team_thread_forge.call_data cd
      JOIN team_thread_forge.transcript_data td ON cd.call_id = td.call_id
      JOIN public.customers c ON cd.customer_id = c.customer_id
      WHERE td.call_reason = 'technical_support'
        AND cd.startdatetime >= $1
        AND SUBSTRING(c.service_address FROM '\\d{5}$') = $2
      ORDER BY cd.startdatetime ASC
    `;

    const results = await prisma.$queryRawUnsafe<any[]>(query, timeFilter, zip);
    
    if (results.length === 0) {
      return NextResponse.json(
        { error: 'No transcripts found for this outage' },
        { status: 404 }
      );
    }

    console.log(`Found ${results.length} transcripts for summary`);

    // Calculate outage start and end times
    const startTimes = results.map(r => new Date(r.startdatetime).getTime());
    const endTimes = results.map(r => new Date(r.enddatetime).getTime());
    const outageStartTime = new Date(Math.min(...startTimes));
    const outageEndTime = new Date(Math.max(...endTimes));

    // Count unique affected customers
    const uniqueCustomers = new Set(results.map(r => r.customer_id));
    const affectedCustomersCount = uniqueCustomers.size;

    // Build context for AI summary (truncate transcripts to avoid token limits)
    const MAX_TRANSCRIPT_LENGTH = 1500;
    const transcriptSummaries = results.map((row, idx) => {
      const transcript = row.transcript.length > MAX_TRANSCRIPT_LENGTH
        ? row.transcript.substring(0, MAX_TRANSCRIPT_LENGTH) + '...[truncated]'
        : row.transcript;
      
      const startTime = new Date(row.startdatetime);
      return `Call ${idx + 1} (Time: ${startTime.toLocaleString()}, Location: ${row.customer_location}):\n${transcript}`;
    }).join('\n\n---\n\n');

    // Build system prompt for initial summary
    const systemPrompt = `You are an AI assistant analyzing technical support call transcripts to provide an initial overview of a potential outage.

You have ${results.length} call transcript(s) from ZIP code ${zip} spanning from ${outageStartTime.toLocaleString()} to ${outageEndTime.toLocaleString()}, affecting ${affectedCustomersCount} unique customers.

Generate a comprehensive but concise summary (3-5 sentences) that includes:
1. The primary technical issue or issues affecting customers
2. Common symptoms and problems reported across calls
3. Affected services or infrastructure components
4. Patterns in timing or geographic distribution
5. Overall severity and customer impact

Be conversational but professional, as this will be shown to a support analyst reviewing the outage.

Call transcripts:

${transcriptSummaries}`;

    // Call Anthropic API for summary generation using Haiku
    console.log('Calling Anthropic API to generate initial summary...');
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: 'Generate the summary based on the call transcripts provided.',
        }],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error('Anthropic API error:', errorText);
      return NextResponse.json(
        { error: 'AI service error', details: errorText },
        { status: anthropicResponse.status }
      );
    }

    const anthropicData = await anthropicResponse.json();
    const summary = anthropicData.content[0].text;

    return NextResponse.json({
      success: true,
      summary: summary,
      metadata: {
        call_count: results.length,
        affected_customers: affectedCustomersCount,
        outage_start: outageStartTime.toISOString(),
        outage_end: outageEndTime.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in outage-summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary', details: String(error) },
      { status: 500 }
    );
  }
}

