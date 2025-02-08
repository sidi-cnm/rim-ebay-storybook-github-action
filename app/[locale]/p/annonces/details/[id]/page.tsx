// import AnnonceDetailCompo from "./ui";
import { handleGetOneAnnonce } from "./page.handlers/handleGetOneAnnonce";
import  BackButton from "../../../../components/Navigation"
import AnnonceDetailCompo from "../../../../components/All_AnnonceDetaille/AnnonceDetailUI"
export default async function AnnonceDetail(
  { params }: { params: { id: string } },
) {
  const annonceId = parseInt(params.id); 
  console.log("annonce id ::" , annonceId)

  const annonce  = await handleGetOneAnnonce(annonceId) 
  console.log("annonce :::: ",annonce)
  
  if (!annonce) {
    return (
      <h1 className="text-2xl font-bold text-center mt-8">
        Annonce non trouvée
      </h1>
    );
  }

  return (
    <div  className="p-4 sm:p-6 md:p-9 overflow-hidden">
          <div className="md:ml-32 lg:ml-44">
              <BackButton />
          </div>
           
           <div>
                <AnnonceDetailCompo annonceId={annonceId} annonce={annonce} />
           </div>
        
    </div>
  
  );
}
