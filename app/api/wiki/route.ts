import { NextRequest, NextResponse } from 'next/server';

const GTA_FANDOM_API = 'https://gta.fandom.com/api.php';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json(
      { error: 'Title parameter is required' },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      titles: title,
      prop: 'extracts|info|pageimages|links',
      exintro: 'true',
      exsentences: '10',
      explaintext: 'true',
      inprop: 'url',
      piprop: 'thumbnail|original',
      pithumbsize: '300',
      pllimit: '10',
    });

    const response = await fetch(`${GTA_FANDOM_API}?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'GTA-WIKI-Modern/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Forward the response from GTA Fandom API
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching from GTA Fandom API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from GTA Fandom API' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
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

