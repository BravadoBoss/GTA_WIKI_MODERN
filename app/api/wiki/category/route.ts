import { NextRequest, NextResponse } from 'next/server';

const GTA_FANDOM_API = 'https://gta.fandom.com/api.php';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const continueToken = searchParams.get('continue');

  if (!category) {
    return NextResponse.json(
      { error: 'Category parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Remove "Category:" prefix if present, we'll add it ourselves
    const cleanCategory = category.startsWith('Category:') 
      ? category.replace('Category:', '') 
      : category;
    
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'categorymembers',
      cmtitle: `Category:${cleanCategory}`,
      cmnamespace: '0',
      cmlimit: '50',
      cmprop: 'title|pageid|timestamp',
    });

    if (continueToken) {
      params.append('cmcontinue', continueToken);
    }

    const apiUrl = `${GTA_FANDOM_API}?${params.toString()}`;
    console.log(`Fetching category: Category:${cleanCategory}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'GTA-WIKI-Modern/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}):`, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Log response for debugging
    if (data.query && data.query.categorymembers) {
      console.log(`Found ${data.query.categorymembers.length} members in category: ${cleanCategory}`);
    } else if (data.error) {
      console.error('API returned error:', data.error);
    } else if (data.query && !data.query.categorymembers) {
      console.warn(`No categorymembers in response for: ${cleanCategory}`, data);
    }
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching category members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category members', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}

