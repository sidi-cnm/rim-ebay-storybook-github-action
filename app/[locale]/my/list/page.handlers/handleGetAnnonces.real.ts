// import { IHandleGetAnnonces, IPageAnnonce } from "./handleGetAnnonces.interface";

// const handleGetAnnonces: IHandleGetAnnonces = async () => {
//     let pageAnnonceData: IPageAnnonce | null = null;
//     let errorMessage = '';

//     try {
//         const response = await fetch('http://localhost:3000/api/', { cache: 'no-store' });

//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }

//         pageAnnonceData = await response.json() as IPageAnnonce;
//     } catch (error) {
//         console.error("Failed to fetch annonces data:", error);
//         errorMessage = "Unable to load annonces at this time. Please try again later.";
//     }

//     return { pageAnnonceData, errorMessage };
// };

// export { handleGetAnnonces }