import React from "react";
import MyAnnonceDetailsUI from "./ui"; 
import { handleGetAnnonces } from "./page.handlers/handleGetOneAnnonce";
import BackButton from "@/app/[locale]/components/Navigation";
import { cookies } from "next/headers";

export default async function AnnonceDetail({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const userid = cookies().get("user");
  const userIdConverted = userid ? parseInt(userid.value) : 0;
  console.log("userconvetedid", userIdConverted);
  //console.log("userconvetedid", id);

  const { pageAnnonceData, errorMessage } = await handleGetAnnonces(userIdConverted, params.locale);

  if (!pageAnnonceData?.annonces || pageAnnonceData.annonces.length === 0) {
    return (
      <h1 className="text-3xl font-bold text-center mt-16 text-red-600">
        Annonce non trouvée
      </h1>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-9 overflow-hidden">
      <div>
        <BackButton />
      </div>
      <MyAnnonceDetailsUI
        lang={params.locale}
        annonceId={userIdConverted}
        annonce={pageAnnonceData.annonces[0]}
      />
    </div>
  );
}


// export default async function AnnonceDetail(
//   params: { locale: string },
// ) {
  
//   const userid = cookies().get("user")
//   const userIdConverted = userid ? parseInt(userid.value) : 0;
//   //const annonce  = await handleGetAnnonces(userIdConverted,params.locale) 
//   const { pageAnnonceData, errorMessage } = await handleGetAnnonces(userIdConverted, params.locale);

//   console.log("pageAnnonceData",pageAnnonceData?.annonces)
 

//   if (pageAnnonceData?.annonces) {
//     return (
//       <h1 className="text-3xl font-bold text-center mt-16 text-red-600">
//         Annonce non trouvée
//       </h1>
//     );
//   }

//   return(
//     <div className="p-4 sm:p-6 md:p-9 overflow-hidden">

//       <div className="">
//          <BackButton />
//       </div>
        
//        <MyAnnonceDetailsUI lang={params.locale} annonceId={userIdConverted} annonce={pageAnnonceData?.annonces[0]} />;
//     </div>

//   )
  
// }
