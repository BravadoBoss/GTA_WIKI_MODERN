import { NextRequest, NextResponse } from 'next/server';

const GTA_FANDOM_API = 'https://gta.fandom.com/api.php';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const continueToken = searchParams.get('continue');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter (q) is required' },
      { status: 400 }
    );
  }

  try {
    const params = new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: query,
      srnamespace: '0',
      srlimit: '50',
      srprop: 'snippet|timestamp',
    });

    if (continueToken) {
      params.append('sroffset', continueToken);
    }

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
    
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error searching wiki:', error);
    return NextResponse.json(
      { error: 'Failed to search wiki' },
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

