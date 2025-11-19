import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface AlertRequest {
  zip: string;
  hours?: number;
  action: 'generate' | 'submit';
  incidentData?: {
    zip_code: string;
    outage_start_time: string;
    outage_end_time: string;
    affected_customers: number;
    incident_summary: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AlertRequest = await request.json();
    const { zip, hours = 24, action, incidentData } = body;

    if (!zip || !action) {
      return NextResponse.json(
        { error: 'ZIP code and action are required' },
        { status: 400 }
      );
    }

    // Handle SUBMIT action - save to database
    if (action === 'submit') {
      if (!incidentData) {
        return NextResponse.json(
          { error: 'Incident data is required for submit action' },
          { status: 400 }
        );
      }

      try {
        // Insert into database using raw SQL since we just added the table
        const result = await prisma.$executeRaw`
          INSERT INTO team_thread_forge.confirmedincidents 
          (zip_code, outage_start_time, outage_end_time, affected_customers, incident_summary, status, created_at)
          VALUES (
            ${incidentData.zip_code},
            ${new Date(incidentData.outage_start_time)},
            ${new Date(incidentData.outage_end_time)},
            ${incidentData.affected_customers},
            ${incidentData.incident_summary},
            'Unresolved',
            NOW()
          )
        `;

        return NextResponse.json({
          success: true,
          message: 'Incident submitted successfully',
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        return NextResponse.json(
          { error: 'Failed to save incident to database', details: String(dbError) },
          { status: 500 }
        );
      }
    }

    // Handle GENERATE action - create incident summary
    if (action === 'generate') {
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

      console.log(`Generating incident summary for ZIP ${zip}, time filter: ${timeFilter.toISOString()}`);

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

      console.log(`Found ${results.length} transcripts for incident summary`);

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

      // Build system prompt for incident summary
      const systemPrompt = `You are an AI assistant analyzing technical support call transcripts to generate a concise incident summary for network operations.

You have ${results.length} call transcript(s) from ZIP code ${zip} spanning from ${outageStartTime.toLocaleString()} to ${outageEndTime.toLocaleString()}.

Generate a professional incident summary (2-4 sentences) that includes:
1. The primary technical issue or issues affecting customers
2. Common symptoms and problems reported across calls
3. Affected services or infrastructure components
4. Geographic scope and customer impact

Be concise, factual, and focus on actionable information for the network operations team.

Call transcripts:

${transcriptSummaries}`;

      // Call Anthropic API for summary generation
      console.log('Calling Anthropic API to generate incident summary...');
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
            content: 'Generate the incident summary based on the call transcripts provided.',
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
      const incidentSummary = anthropicData.content[0].text;

      return NextResponse.json({
        success: true,
        incidentData: {
          zip_code: zip,
          outage_start_time: outageStartTime.toISOString(),
          outage_end_time: outageEndTime.toISOString(),
          affected_customers: affectedCustomersCount,
          incident_summary: incidentSummary,
        },
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in alert-network-team:', error);
    return NextResponse.json(
      { error: 'Failed to process alert request', details: String(error) },
      { status: 500 }
    );
  }
}

