"use client";
import Link from "next/link"; 
import React from "react";
import Image from "next/image";   
import { Annonce } from "@/app/types";

import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client"; 
import Pagination from "../../ui/PaginationUI";
export default function PaginationUI(props: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();

  const handleClickToNextPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage + 1;
    router.push(`?page=${nextPage}`);
  };

  const handleClickPrevPage = () => {
    //const currentPage = Number(router.query.page) || 1;
    const nextPage = props.currentPage - 1;
    router.push(`?page=${nextPage}`);
  };

  return (
    <>
      <div className="mt-8 flex gap-2 justify-center">
        <button 
          onClick={() => handleClickPrevPage()}
          disabled={props.currentPage === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="py-2 px-4">
          Page {props.currentPage} sur {props.totalPages}
        </span>
        <button 
          onClick={() => handleClickToNextPage()}
          disabled={props.currentPage === props.totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </>
  );
}





const fallbackImageUrl = "/noimage.jpg";
function getValidImageUrl(url: string | undefined): string { 
  return typeof url === "string" && url.trim() !== "" ? url : fallbackImageUrl;
}
function AnnonceItemUI({annonce,lang = "ar"}: {annonce:Annonce,lang?: string}) {

    console.log("annonceUI",annonce)

  const t = useI18n();

    const getImage = () => {
        const hostServerForImages = "https://picsum.photos"
        const imgUrl = `${hostServerForImages}/${annonce.firstImagePath}`
        return (<>
          <Image
            src={imgUrl}
            alt={annonce.description}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </>)
      } 
  return (
    <>
      <article className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative h-48 w-full">
            
            {
            annonce.haveImage && (getImage())
          }
          {
            !annonce.haveImage && (<Image
              src={fallbackImageUrl}
              alt={annonce.description}
              fill
              unoptimized
              style={{ objectFit: "cover" }}
            />)
          }
         
        </div>
        <div className="p-6 flex-grow">
          <h2 className="text-xl font-semibold mb-2">
          
            {lang==="ar" ? "العنوان" : annonce.title}
          </h2>
          <p className="text-gray-600 mb-2 mx-2">{annonce.description}</p>

          <div className="mt-5">
              <div className="border-t border-green-800  my-2"></div>
              <div className="flex justify-between">
                  <p className="font-bold">{t('prix')}</p>
                  <p className="text-lg text-green-700 font-bold">{annonce.price} MRU</p>
              </div>
              <div className="border-t border-green-800  my-2"></div>
          </div>
          
          
          <span className="inline-block bg-green-800 rounded-full px-3 py-1 text-sm font-semibold text-white mt-2">
            {lang === 'ar' ?  annonce?.categorie?.nameAr : annonce?.categorie?.name}
          </span>
        </div>
      </article>
    </>
  );
}


export  function MyListAnnoncesUI(
  { totalPages, lang = "ar", currentPage, annonces }: {lang?: string, totalPages: number ;currentPage: number; annonces: Annonce[]},
) { 
  console.log("annonces:::::" , annonces)
  const t = useI18n();

  return (
    <>
      <div className="container mx-auto"> 
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {t("Annonces")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce) => (
            <Link
              href={`/my/details/${annonce.id}`}
              key={annonce.id}
              className="block"
            >
              <AnnonceItemUI annonce={annonce} lang={lang} />
            </Link>
          ))}
        </div>
      
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      
      
      </div>
    </>
  );
}
