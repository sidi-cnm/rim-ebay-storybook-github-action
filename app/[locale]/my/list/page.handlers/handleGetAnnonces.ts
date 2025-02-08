import axios from 'axios';

export async function handleGetAnnonces(
  userId: number,
  locale: string,
  filters: Record<string, string | number | boolean | undefined> = {}
) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const params = new URLSearchParams({ userId: String(userId) });
    for (const key in filters) {
      if (filters[key] !== undefined) {
        params.append(key, String(filters[key]));
      }
    }

    const data = await fetch(
      `${baseURL}/${locale}/api/annonces?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    const annonces = await data.json();

    return {
      pageAnnonceData: {
        annonces: annonces,
        totalPages: 1,
      },
      errorMessage: null,
    };
  } catch (error) {
    console.error('Error fetching annonces:', error);
    return {
      pageAnnonceData: null,
      errorMessage: 'Error fetching annonces',
    };
  }
}
