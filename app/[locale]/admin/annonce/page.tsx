import React from "react";
import AnnonceAdmin from "../../components/AnonnceAdmin";
import Input from "../../components/InputAdmin";
import { FaSearch, FaPlus } from "react-icons/fa";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  // Simuler des données chargées depuis une API
  const annonces = [
    {
      id: 1,
      title: "Belle Maison",
      description: "Une belle maison avec jardin.",
      price: 120000,
      name: "John Doe",
      contact: "+222 22222222",
    },
    {
      id: 2,
      title: "Appartement à louer",
      description: "Appartement spacieux au centre-ville.",
      price: 800,
      name: "Jane Smith",
      contact: "+222 22222222",
    },
    {
      id: 2,
      title: "Appartement à louer",
      description: "Appartement spacieux au centre-ville.",
      price: 800,
      name: "Jane Smith",
      contact: "+222 22222222",
    },
  ];

  return (
    <div className="py-28 px-14">
      <div className="flex justify-between">

          
          <div className="text-2xl mt-1 font-bold text-gray-800 uppercase mb-6">LIST DES ANONNCES </div>
            <Input/>
            <button className="flex items-center px-7 w-20 h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                  <FaPlus className="mr-2" />
            </button>
           </div>
          <AnnonceAdmin annonces={annonces} />
    </div>
  );
}
