import dataOne from './data.itemOne.json';
import dataTwo from './data.itemTwo.json';
import { PrismaClient } from "@prisma/client";
import { Annonce } from "@/app/types";

const prisma = new PrismaClient();

export const handleGetOneAnnonce = async (annonceId: number) => {
    // Recherche de l'annonce en base de données
    const annonce = await prisma.annonce.findUnique({
        where: { id: annonceId },
        include: {
            typeAnnonce: { select: { name: true, nameAr: true } },
            categorie: { select: { name: true, nameAr: true } },
            images: { select: { id: true, imagePath: true } },
        },
    });

    // Vérification si l'annonce existe
    if (!annonce) {
        throw new Error(`Annonce avec l'ID ${annonceId} non trouvée`);
    }

    // Création de l'objet Annonce
    const annonces: Annonce = {
        id: annonce.id,
        typeAnnonceId: annonce.typeAnnonceId,
        typeAnnonceName: annonce.typeAnnonce?.name ?? "",
        typeAnnonceNameAr: annonce.typeAnnonce?.nameAr ?? "",
        categorieId: annonce.categorieId,
        categorieName: annonce.categorie?.name ?? "",
        categorieNameAr: annonce.categorie?.nameAr ?? "",
        lieuId: annonce.lieuId,
        lieuStr: "",
        lieuStrAr: "",
        userId: annonce.userId,
        title: annonce.title,
        description: annonce.description,
        price: annonce.price,
        contact: annonce.contact,
        haveImage: annonce.haveImage,
        firstImagePath: annonce.firstImagePath,
        images: annonce.images ?? [],
        status: annonce.status,
        updatedAt: annonce.updatedAt,
        createdAt: annonce.createdAt,
    };

    return annonces;
};
