import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse filters
    const platform = searchParams.get('platform');
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const hours = parseInt(searchParams.get('hours') || '168', 10); // Default 7 days
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '50', 10);
    const search = searchParams.get('search');

    // Calculate time filter
    const timeFilter = new Date(Date.now() - hours * 60 * 60 * 1000);

    // Build where clause
    const where: any = {
      timestamp: { gte: timeFilter }
    };

    if (platform) {
      where.social_media = platform;
    }

    if (category) {
      where.category = category;
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (search) {
      where.OR = [
        { comment: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Get total count
    const total = await prisma.socialMediaData.count({ where });

    // Get paginated data
    const data = await prisma.socialMediaData.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    // Convert timestamps to ISO strings
    const formattedData = data.map(post => ({
      ...post,
      timestamp: post.timestamp.toISOString(),
    }));

    return NextResponse.json({
      data: formattedData,
      total,
      page,
      pageSize,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching social media data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social media data', details: String(error) },
      { status: 500 }
    );
  }
}

