import { Suspense } from "react";
//mport { handleGetAnnonces } from "./page.handlers/handleGetAnnonces";
import { MyListAnnoncesUI } from "./ui";
import { LottieAnimation } from "../../components/LottieAnimation";
import { cookies } from "next/headers";
//import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Importation de l'instance Prisma
//import { Annonce } from "@/docs/db-tables-interface";

// Définition des types pour la requête
interface CreateAnnonceRequest {
  typeAnnonceId: number;
  subcategorieId: number;
  categorieId: number;
  lieuId: number;
  userId: number;
  title: string;
  description: string;
  price: number;
  contact: string;
  haveImage: boolean;
  firstImagePath: string;
  images: { imagePath: string }[];
  status: string;
}





export default async function Home({
  params,
  searchParams,
}: {
  params: { locale: string },
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const userid = cookies().get("user")
  const userIdConverted = userid ? parseInt(userid.value) : 0; // Convertissez en nombre si existe

  //const { pageAnnonceData, errorMessage } = await handleGetAnnonces(userIdConverted, params.locale);
  //console.log("pageAnnonceData",pageAnnonceData)

 // const { searchParams } = new URL(request.url);
   // const userId = searchParams.get('userId');

   

    const annonces = await prisma.annonce.findMany({
      where: { 
        userId: userIdConverted ? parseInt(String(userIdConverted), 10) : undefined
      },
      include: { 
        images: true,
        typeAnnonce:true,
        // typeAnnonce: {
        //   select:{
        //     id:true,
        //     name:true
        //   }
        // },
        categorie:true,
        // categorie: {
        //   select: {
        //     id: true,
        //     name: true
        //   }
        // },
        lieu:true
       
        }
      });
      console.log("anonnces text: " ,annonces)

  const itemsPerPage = 6; // Define the number of items per page

  const totalPages = Math.ceil(annonces.length / itemsPerPage); // Calculate total pages based on your logic

  return (
    <main className="min-h-screen">
      <div className="p-8">
        <Suspense fallback={
          <div className="flex justify-center items-center">
            <LottieAnimation 
            />
          </div>
        }>
          {!annonces ? (
            <p className="text-red-500 text-center">
              <LottieAnimation 
            />
            </p>
          ) : (
            annonces ? (
              <MyListAnnoncesUI
                totalPages={totalPages}
                currentPage={currentPage}
                annonces={annonces}
                lang={params.locale}
              />
            ) : (
              <div className="flex justify-center items-center">
                <LottieAnimation 
                />
              </div>
            )
          )}
        </Suspense>
      </div>
    </main>
  );
}
