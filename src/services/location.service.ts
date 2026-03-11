import { LocationSearchResult } from '../types/schedule';

export async function searchLocations(
  query: string,
): Promise<LocationSearchResult[]> {
  if (!query || query.length < 3) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'ScheduleManagementApp',
        },
      },
    );

    if (!response.ok) throw new Error('Failed to fetch location data');

    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}
