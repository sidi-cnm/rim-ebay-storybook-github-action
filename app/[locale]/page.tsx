"use client"
import { handleGetAnnonces } from "./page.handlers/handleGetAnnonces";
import ListAnnoncesUI from "./ui/ListAnnoncesUI";
 
//import InputDialog from "./components/InputDialog";
import Input from "./components/Input";
import AnnoceTitle from "./components/AnnoceTitle";

 

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
 
  // const t = useI18n();
  const currentPage = Number(searchParams?.page) || 1;
  const { pageAnnonceData, errorMessage } = await handleGetAnnonces()
  

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="p-5 sm:mx-16 ">
      
        <div className="flex justify-between  px-4 py-2">
          <AnnoceTitle />
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
