// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// // GET - Récupérer toutes les localisations GPS
// export async function GET() {
//   try {
//     const gpsLocations = await prisma.gPSLocation.findMany({
//       include: {
//         user: true,  // Inclure les informations de l'utilisateur associé
//     //   },
//       orderBy: {
//         createdAt: 'desc'  // Trier par date de création, plus récent d'abord
//       }
//     });

//     return NextResponse.json(gpsLocations);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des localisations GPS:", error);
//     return NextResponse.json(
//       { error: "Erreur lors de la récupération des localisations GPS" },
//       { status: 500 }
//     );
//   }
// }

// // POST - Créer une nouvelle localisation GPS
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { latitude, longitude, userId } = body;

//     // Validation des données
//     if (!latitude || !longitude || !userId) {
//       return NextResponse.json(
//         { error: "Tous les champs sont requis (latitude, longitude, userId)" },
//         { status: 400 }
//       );
//     }

//     // Vérifier si l'utilisateur existe
//     const user = await prisma.user.findUnique({
//       where: { id: userId }
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Utilisateur non trouvé" },
//         { status: 404 }
//       );
//     }

//     // Créer la nouvelle localisation GPS
//     const newGpsLocation = await prisma.gpsLocation.create({
//       data: {
//         latitude,
//         longitude,
//         userId
//       },
//       include: {
//         user: true
//       }
//     });

//     return NextResponse.json(newGpsLocation, { status: 201 });
//   } catch (error) {
//     console.error("Erreur lors de la création de la localisation GPS:", error);
//     return NextResponse.json(
//       { error: "Erreur lors de la création de la localisation GPS" },
//       { status: 500 }
//     );
//   }
// }
