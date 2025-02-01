// app/api/annonces/route.ts

import { NextResponse } from 'next/server';
//import prisma from '../../../../lib/prisma'; // Importation de l'instance Prisma
import prisma from '@/lib/prisma'
 
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

// 1. Créer une annonce (POST)
export async function POST(request: Request): Promise<NextResponse> {
    try {
      const data: CreateAnnonceRequest = await request.json();
  
      // Créer une nouvelle annonce dans la base de données
      const newAnnonce = await prisma.annonce.create({
        data: {
          typeAnnonceId: data.typeAnnonceId,
          subcategorieId: data.subcategorieId,
          categorieId: data.categorieId,
          lieuId: data.lieuId,
          userId: data.userId,
          title: data.title,
          description: data.description,
          price: data.price,
          contact: data.contact,
          haveImage: data.haveImage,
          firstImagePath: data.firstImagePath,
          images: {
            create: data.images.map((image) => ({
              imagePath: image.imagePath,
            })),
          },
          status: data.status,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      });
  
      return NextResponse.json(newAnnonce, { status: 201 });
    } catch (error) {
      console.error('Erreur lors de la création de l\'annonce:', error); // Afficher l'erreur dans les logs
      return NextResponse.json({ error: 'Error creating annonce', details: error }, { status: 500 });
    }
  }
  

// 2. Récupérer toutes les annonces (GET)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const annonces = await prisma.annonce.findMany({
      where: { 
        userId: userId ? parseInt(userId, 10) : undefined
      },
      include: {
        images: true,
        typeAnnonce: {
          select:{
            id:true,
            name:true
          }
        },
        categorie: {
          select: {
            id: true,
            name: true
          }
        },
        lieu: true,
      },
    });

    console.log("annonces ::" , annonces)
    if (!annonces || annonces.length === 0) {
      return NextResponse.json({ error: 'Annonces not found' }, { status: 404 });
    }

    return NextResponse.json(annonces, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching annonces' }, { status: 500 });
  }
}
