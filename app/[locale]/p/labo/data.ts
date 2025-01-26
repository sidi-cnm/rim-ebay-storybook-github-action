
// Définition des types
//import { AnnonceType } from "@/app/lib/db";

export enum AnnonceType {
  Vente = 'vente',
  Location = 'location',
  Service = 'service',
  Autre = 'autre'
}


  
 export interface Category {
    id: number;
    name: string;
    type: AnnonceType;
  }
  
 export interface SubCategory {
    id: number;
    name: string;
    categorie_id: number;
  }
  
  export const categories: Category[] = [
    { id: 1, name: 'immobilier', type: AnnonceType.Location },
    { id: 2, name: 'véhicule', type: AnnonceType.Location },
    { id: 3, name: 'immobilier', type: AnnonceType.Vente },
    { id: 4, name: 'véhicule', type: AnnonceType.Vente },
    { id: 5, name: 'électricité', type: AnnonceType.Service },
  ];
  
  export const subCategories: SubCategory[] = [
    { id: 1, name: 'maison', categorie_id: 1 },
    { id: 2, name: 'appartement', categorie_id: 1 },
    { id: 3, name: 'bureau/commerce', categorie_id: 1 },
    { id: 4, name: 'terrain', categorie_id: 1 },
    { id: 5, name: 'autre', categorie_id: 1 },
    { id: 6, name: 'voiture', categorie_id: 2 },
    { id: 7, name: 'moto', categorie_id: 2 },
    { id: 8, name: 'bus, camion, caravane', categorie_id: 2 },
    { id: 9, name: 'Engins de construction et agricoles', categorie_id: 2 },
    { id: 10, name: 'scooter', categorie_id: 2 },
    { id: 11, name: 'autre', categorie_id: 2 },
    { id: 12, name: 'maison', categorie_id: 3 },
    { id: 13, name: 'appartement', categorie_id: 3 },
    { id: 14, name: 'bureau/commerce', categorie_id: 3 },
    { id: 15, name: 'terrain', categorie_id: 3 },
    { id: 16, name: 'autre', categorie_id: 3 },
    { id: 17, name: 'voiture', categorie_id: 4 },
    { id: 18, name: 'moto', categorie_id: 4 },
    { id: 19, name: 'bus, camion, caravane', categorie_id: 4 },
    { id: 20, name: 'Engins de construction et agricoles', categorie_id: 4 },
    { id: 21, name: 'scooter', categorie_id: 4 },
    { id: 22, name: 'autre', categorie_id: 4 },
    { id: 23, name: 'electricite', categorie_id: 5 },
    { id: 24, name: 'plomberie', categorie_id: 5 },
    { id: 25, name: 'enseignant', categorie_id: 2 },
    { id: 26, name: 'autre', categorie_id: 2 },
  ];
  