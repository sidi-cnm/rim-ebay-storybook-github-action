import { PrismaClient } from "@prisma/client";
import { IHandleGetAnnonces, IPageAnnonce } from "./handleGetAnnonces.interface";
import { Annonce } from "@/app/types";

const prisma = new PrismaClient();

const handleGetAnnonces: IHandleGetAnnonces = async () => {
    let pageAnnonceData: IPageAnnonce | null = null;
    let errorMessage = '';

    try {
        const annoncesFromDB = await prisma.annonce.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                typeAnnonce: {
                    select: { name: true , nameAr:true }
                },
                categorie: {
                    select: { name: true, nameAr:true }
                },
                images: {
                    select: {
                        id: true,
                        imagePath: true,
                    }
                }
            }
        });

        console.log("annonce data :", annoncesFromDB);

        // 🔄 Transformer les objets `typeAnnonce` et `categorie` en valeurs simples
        const annonces: Annonce[] = annoncesFromDB.map(annonce => ({
            id: annonce.id,
            typeAnnonceId: annonce.typeAnnonceId,
            typeAnnonceName: annonce.typeAnnonce?.name ?? "", // ✅ Extraire uniquement `name`
            typeAnnonceNameAr:annonce.typeAnnonce.nameAr,
            categorieId: annonce.categorieId,
            categorieName: annonce.categorie?.name ?? "", 
            categorieNameAr:annonce.categorie.nameAr,
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

        // 🛠 Gérer la pagination
        pageAnnonceData = {
            totalPages: Math.max(1, Math.ceil(annonces.length / 10)), // Assurer qu'on ait au moins 1 page
            annonces,
        };

    } catch (error) {
        errorMessage = "❌ Erreur lors de la récupération des annonces";
        console.error(errorMessage, error);
    }

    return { pageAnnonceData, errorMessage };
};

export { handleGetAnnonces };
