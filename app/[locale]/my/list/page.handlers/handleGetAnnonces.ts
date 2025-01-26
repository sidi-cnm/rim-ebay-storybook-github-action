import axios from 'axios';

export async function handleGetAnnonces(userId: number, locale: string) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    // const { data } = await axios.get(`${baseURL}/${locale}/api/annonces`, {
    //   params: { userId },
    //   headers: {
    //     'Content-Type': 'application/json',
        
    //   },
      
    // });

    const  data = await fetch (`${baseURL}/${locale}/api/annonces`,{ 
        body: JSON.stringify({ userId}),
        headers: {
          'Content-Type': 'application/json',
           
        },
        cache:"no-store"
        
      });
   



    return { 
      pageAnnonceData: { 
        annonces: data, 
        totalPages: 1 
      }, 
      errorMessage: null 
    };
  } catch (error) {
    console.error('Error fetching annonces:', error);
    return { 
      pageAnnonceData: null, 
      errorMessage: 'Error fetching annonces' 
    };
  }
}