import { IHandleGetAnnonces, IPageAnnonce } from "./handleGetAnnonces.interface";

import data from './data.json'

const handleGetAnnonces: IHandleGetAnnonces = async () => {
    let pageAnnonceData: IPageAnnonce | null = null;
    let errorMessage = '';
    const annonces = data.annonces.map(annonce => ({
        ...annonce,
        //created_at: new Date(annonce.createdAt),
      }));
      

    pageAnnonceData = {
        totalPages:data.totalPages,
        annonces
    }
 

    return { pageAnnonceData, errorMessage };
};

export { handleGetAnnonces }