import { PrismaClient } from "@prisma/client";
import { IHandleGetAnnonces, IPageAnnonce } from "./handleGetAnnonces.interface";
import { Annonce } from "@/app/types";

const prisma = new PrismaClient();

interface Filters {
    typeAnnonceId?: string;
    categorieId?: string;
    subCategorieId?: string;
    price?: string;
    description?: string;
}

export type { Filters };

const handleGetAnnonces: IHandleGetAnnonces = async (filters: Filters = {}) => {
    let pageAnnonceData: IPageAnnonce | null = null;
    let errorMessage = '';

    try {
        const whereClause: any = {};

        if (filters.typeAnnonceId) whereClause.typeAnnonceId = Number(filters.typeAnnonceId);
        if (filters.categorieId) whereClause.categorieId = Number(filters.categorieId);
        if (filters.subCategorieId) whereClause.subcategorieId = Number(filters.subCategorieId);
        if (filters.price) whereClause.price = { lte: Number(filters.price) };
        if (filters.description) whereClause.description = { contains: filters.description, mode: "insensitive" };

        const annoncesFromDB = await prisma.annonce.findMany({
            where: whereClause,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                typeAnnonce: { select: { name: true, nameAr: true } },
                categorie: { select: { name: true, nameAr: true } },
                images: { select: { id: true, imagePath: true } },
            },
        });

        const annonces: Annonce[] = annoncesFromDB.map(annonce => ({
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
        }));

        pageAnnonceData = {
            totalPages: Math.max(1, Math.ceil(annonces.length / 10)),
            annonces,
        };

    } catch (error) {
        errorMessage = "❌ Erreur lors de la récupération des annonces";
        console.error(errorMessage, error);
    }

    return { pageAnnonceData, errorMessage };
};

export { handleGetAnnonces };