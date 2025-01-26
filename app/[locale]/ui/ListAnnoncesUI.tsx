import Link from "next/link";
import Image from "next/image";
import { Annonce } from "@/app/types";
import PaginationUI from "./PaginationUI";
import { useState } from "react";

const fallbackImageUrl = "/noimage.jpg";

function AnnonceItemUI(annonce: Annonce) {
  const getImage = () => {
    const hostServerForImages = "https://picsum.photos";
    const imgUrl = `${hostServerForImages}/${annonce.firstImagePath}`;
    return (
      <Image
        src={imgUrl}
        alt={annonce.description}
        fill
        unoptimized
        style={{ objectFit: "cover" }}
      />
    );
  };
  const createdAt = new Date(annonce.createdAt);

  const formatedDatePartOne = `${createdAt.getDay()}-${createdAt.getMonth()}-${createdAt.getFullYear()}`;
  const formatedDatePartTwo = `${createdAt.getHours()} h : ${createdAt.getMinutes()} min`;

  return (
    <article className="flex flex-col w-full bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full sm:flex-row sm:max-w-lg sm:mx-auto mx-2">
      <div className="relative h-48 sm:h-auto w-full sm:w-1/2">
        {annonce.haveImage ? getImage() : (
          <Image
            src={fallbackImageUrl}
            alt={annonce.description}
            fill
            unoptimized
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <span className="inline-block bg-green-800 rounded-full px-5 w-fit py-1 text-xs sm:text-sm font-semibold text-white mt-1">
          {annonce.typeAnnonceName} / {annonce.categorieName}
        </span>
        <h2 className="text-lg sm:text-xl mt-3 font-semibold mb-1">{annonce.title}</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-2">{annonce.description}</p>

        <div className="border-t border-gray-300 my-2"></div>
        <div className="flex justify-between items-center">
          <span className="text-sm sm:text-base">PRIX</span>
          <p className="text-base sm:text-lg text-green-800 font-bold">{annonce.price} UMR</p>
        </div>
        <div className="border-t border-gray-300 my-2"></div>
        <button className="bg-orange-400 w-full hover:bg-orange-500 mt-4 py-2 rounded-xl text-white font-bold">
          Details
        </button>
      </div>
    </article>
  );
}


export default function ListAnnoncesUI({
  totalPages,
  currentPage,
  annonces,
}: {
  totalPages: number;
  currentPage: number;
  annonces: Annonce[];
}) {
  return (
    <div className="container  px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {annonces.map((annonce) => (
          <Link
            href={`/p/annonces/details/${annonce.id}`}
            key={annonce.id}
            className="block"
          >
            <AnnonceItemUI {...annonce} />
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}

