// app/api/annonces/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Importation de l'instance Prisma


// 1. Récupérer une annonce par ID (GET)
export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const annonceId = parseInt(params.id, 10);

    // Vérifier si l'ID est valide
    if (isNaN(annonceId)) {
      return NextResponse.json({ error: 'Invalid annonce ID' }, { status: 400 });
    }

    const annonce = await prisma.annonce.findUnique({
      where: { id: annonceId },
      include: {
        images: true,
        typeAnnonce: true,
        categorie: true,
        lieu: true,
      },
    });

    if (!annonce) {
      return NextResponse.json({ error: 'Annonce not found' }, { status: 404 });
    }

    return NextResponse.json(annonce, { status: 200 });
  } catch (error) {
    console.error('Error fetching annonce:', error);
    return NextResponse.json({ error: 'Error fetching annonce' }, { status: 500 });
  }
}


// 2. Mettre à jour une annonce (PUT)
export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const annonceId = parseInt(params.id, 10); // Convertir l'ID en nombre entier
    const data: any = await request.json(); // Récupérer les données de mise à jour

    const updatedAnnonce = await prisma.annonce.update({
      where: { id: annonceId },
      data: {
        typeAnnonceId: data.typeAnnonceId,
        categorieId: data.categorieId,
        subcategorieId:data.subcategorieId,
        lieuId: data.lieuId,
        userId: data.userId,
        title: data.title,
        description: data.description,
        price: data.price,
        contact: data.contact,
        haveImage: data.haveImage,
        firstImagePath: data.firstImagePath,
        images: {
          deleteMany: {}, // Supprime toutes les images existantes
          create: data.images.map((image: any) => ({
            imagePath: image.imagePath,
          })),
        },
        status: data.status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedAnnonce, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating annonce' }, { status: 500 });
  }
}

// 3. Supprimer une annonce (DELETE)
export async function DELETE( request: Request, 
  { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    console.log("head", params?.id)
    const annonceId = parseInt(params?.id, 10); // Convertir l'ID en nombre entier

    const deletedAnnonce = await prisma.annonce.delete({
      where: { id: annonceId },
    });

    return NextResponse.json(deletedAnnonce, { status: 200 });
  } catch (error) {
    console.log("error delete:: " , error)
    return NextResponse.json({ error: 'Error deleting annonce' }, { status: 500 });
  }
}
