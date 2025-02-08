
// Définition des types
//import { AnnonceType } from "@/app/lib/db";

import { Interface } from "readline";

export enum AnnonceType {
  Vente = 'Vente',
  Location = 'Location',
  Service = 'Service',
  Autre = 'autre'
} 

export interface Annonce {
  id: number;
  typeAnnonceId: number;
  typeAnnonceName: string;
  typeAnnonceNameAr: string;
  categorieId: number;
  categorieName: string;
  categorieNameAr: string;
  subcategorieId: number;
  subcategorieName: string;
  subcategorieNameAr: string;
  lieuId: number;
  lieuStr: string;
  lieuStrAr: string;
  userId: number;
  title: string;
  description: string;
  price: number;
  contact: string;
  haveImage: boolean;
  images: [];
  createdAt: Date;
}


  
 export interface Category {
    id: number;
    name: string;
    nameAr:string;
    typeAnnonceId: number;
    priority?:number;
    createdAt?:Date
    
  }
  
 export interface SubCategory {
    id: number;
    name: string;
    nameAr:string;
    categorie_id: number;
    
  }
  
  export const categories: Category[] = [
    { id: 1, name: 'immobilier', nameAr:"" , typeAnnonceId:1 },
    { id: 3, name: 'véhicule',  nameAr:"" , typeAnnonceId:2 },
    { id: 2, name: 'électricité',  nameAr:"" , typeAnnonceId:3 },
  ];
  
  export const subCategories: SubCategory[] = [
    { id: 1, name: 'maison',nameAr:"", categorie_id: 1 },
    { id: 2, name: 'appartement',nameAr:"", categorie_id: 1 },
    { id: 3, name: 'bureau/commerce',nameAr:"", categorie_id: 1 },
    { id: 4, name: 'terrain', nameAr:"", categorie_id: 1 },
    { id: 5, name: 'autre', nameAr:"", categorie_id: 1 },
    { id: 6, name: 'voiture',nameAr:"", categorie_id: 2 },
    { id: 7, name: 'moto', nameAr:"",categorie_id: 2 },
    { id: 8, name: 'bus, camion, caravane', nameAr:"", categorie_id: 2 },
    { id: 9, name: 'Engins de construction et agricoles',nameAr:"", categorie_id: 2 },
    { id: 10, name: 'scooter',nameAr:"", categorie_id: 2 },
    { id: 11, name: 'autre', nameAr:"", categorie_id: 2 },
    { id: 12, name: 'maison', nameAr:"",categorie_id: 3 },
    { id: 13, name: 'appartement',nameAr:"", categorie_id: 3 },
    { id: 14, name: 'bureau/commerce',nameAr:"", categorie_id: 3 },
    { id: 15, name: 'terrain',nameAr:"", categorie_id: 3 },
    { id: 16, name: 'autre', nameAr:"",categorie_id: 3 },
    { id: 17, name: 'voiture',nameAr:"", categorie_id: 6 },
    { id: 18, name: 'moto', nameAr:"",categorie_id: 6 },
    { id: 19, name: 'bus, camion, caravane',nameAr:"", categorie_id: 4 },
    { id: 20, name: 'Engins de construction et agricoles',nameAr:"", categorie_id: 4 },
    { id: 21, name: 'scooter',nameAr:"", categorie_id: 6 },
    { id: 22, name: 'autre',nameAr:"", categorie_id: 6 },
    { id: 23, name: 'electricite',nameAr:"", categorie_id: 5 },
    { id: 24, name: 'plomberie', nameAr:"",categorie_id: 5 },
    { id: 25, name: 'enseignant',nameAr:"", categorie_id: 2 },
    { id: 26, name: 'autre', nameAr:"", categorie_id: 2 },
  ];
  