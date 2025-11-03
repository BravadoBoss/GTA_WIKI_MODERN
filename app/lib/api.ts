// GTA Fandom API utility functions

const API_ROUTE = '/api/wiki';

export interface WikiPage {
  pageid: number;
  ns: number;
  title: string;
  extract?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  original?: {
    source: string;
    width: number;
    height: number;
  };
  links?: Array<{
    ns: number;
    title: string;
  }>;
  canonicalurl?: string;
  fullurl?: string;
}

export interface WikiQueryResult {
  query: {
    pages: {
      [key: string]: WikiPage;
    };
  };
}

export async function fetchWikiPage(title: string): Promise<WikiPage | null> {
  try {
    const response = await fetch(`${API_ROUTE}?title=${encodeURIComponent(title)}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WikiQueryResult = await response.json();
    const pages = data.query?.pages;

    if (!pages || Object.keys(pages).length === 0) {
      return null;
    }

    return Object.values(pages)[0];
  } catch (error) {
    console.error('Error fetching wiki page:', error);
    return null;
  }
}

export async function fetchMainPage(): Promise<WikiPage | null> {
  return fetchWikiPage('Grand_Theft_Auto_V');
}

// Category members interfaces
export interface CategoryMember {
  pageid: number;
  ns: number;
  title: string;
  timestamp: string;
}

export interface CategoryMembersResult {
  query: {
    categorymembers: CategoryMember[];
  };
  continue?: {
    cmcontinue: string;
    continue: string;
  };
}

// Search result interfaces
export interface SearchResult {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

export interface SearchResultQuery {
  searchinfo: {
    totalhits: number;
  };
  search: SearchResult[];
}

export interface SearchResultResponse {
  query: SearchResultQuery;
  continue?: {
    sroffset: number;
    continue: string;
  };
}

// Fetch category members
export async function fetchCategoryMembers(
  category: string,
  continueToken?: string
): Promise<CategoryMembersResult | null> {
  try {
    let url = `/api/wiki/category?category=${encodeURIComponent(category)}`;
    if (continueToken) {
      url += `&continue=${encodeURIComponent(continueToken)}`;
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Category fetch error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CategoryMembersResult = await response.json();
    
    // Log for debugging
    if (data.query && data.query.categorymembers) {
      console.log(`Category "${category}": Found ${data.query.categorymembers.length} members`);
    } else {
      console.warn(`Category "${category}": No members found in response`, data);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching category members:', error);
    return null;
  }
}

// Search wiki pages
export async function searchWiki(
  query: string,
  continueToken?: string
): Promise<SearchResultResponse | null> {
  try {
    let url = `/api/wiki/search?q=${encodeURIComponent(query)}`;
    if (continueToken) {
      url += `&continue=${encodeURIComponent(continueToken)}`;
    }

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SearchResultResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching wiki:', error);
    return null;
  }
}

// GTA V specific categories - using actual GTA Fandom category names
export const GTAV_CATEGORIES = {
  characters: 'Characters_in_Grand_Theft_Auto_V',
  vehicles: 'Vehicles', // Found working category name
  weapons: 'Weapons_in_Grand_Theft_Auto_V',
  locations: 'Locations_in_Grand_Theft_Auto_V',
  missions: 'Missions_in_Grand_Theft_Auto_V',
} as const;

// Alternative category names to try
export const GTAV_CATEGORY_ALTERNATIVES = {
  vehicles: [
    'Vehicles_in_Grand_Theft_Auto_V',
    'Vehicles in Grand Theft Auto V',
    'Grand_Theft_Auto_V_Vehicles',
    'Vehicles',
    'Category:Vehicles_in_Grand_Theft_Auto_V',
  ],
  characters: [
    'Characters_in_Grand_Theft_Auto_V',
    'Characters in Grand Theft Auto V',
    'Grand_Theft_Auto_V_Characters',
    'Characters',
  ],
  weapons: [
    'Weapons_in_Grand_Theft_Auto_V',
    'Weapons in Grand Theft Auto V',
    'Grand_Theft_Auto_V_Weapons',
    'Weapons',
  ],
} as const;

