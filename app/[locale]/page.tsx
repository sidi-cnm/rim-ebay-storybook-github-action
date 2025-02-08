import { handleGetAnnonces } from "./page.handlers/handleGetAnnonces";
import ListAnnoncesUI from "./ui/ListAnnoncesUI";
 
//import InputDialog from "./components/InputDialog";

//TACHES A FAIRE 
// MOVE AnnonceItemUI  COMPONENET VERS LES COMPONENT FOLDER
// RECUPERE LE DONNERS REEL DEPUIS LE BASE DE DEONNER
//CREER UN STORIES
// TESTER LE AVEC STORYBOOK
import Input from "./components/Input";

 

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {

  const currentPage = Number(searchParams?.page) || 1;

  // Extract filter parameters from searchParams
  const filter = Object.fromEntries(
    Object.entries(searchParams || {}).filter(([key]) => key !== 'page')
  );
  console.log("filter" , filter)

  const { pageAnnonceData, errorMessage } = await handleGetAnnonces(filter);
  console.log("page errorMessage" , errorMessage);
  console.log("pageAnnonceData :: " , pageAnnonceData);

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="p-5 sm:mx-16 ">
      
        <div className="flex justify-between  px-4 py-2">
          {/* <AnnoceTitle /> */}
          <Input />
        </div>
        
        {errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          pageAnnonceData && (
                     <ListAnnoncesUI
                      totalPages={pageAnnonceData.totalPages}
                      currentPage={currentPage}
                      annonces={pageAnnonceData.annonces}
                  />
          )
        )}
      </div>
    </main>
  );
}
