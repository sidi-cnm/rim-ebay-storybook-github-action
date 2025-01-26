import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in a specific order
  await prisma.annonce.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.subCategory.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.typeAnnonce.deleteMany({});
  await prisma.wilaya.deleteMany({});
  await prisma.moughataa.deleteMany({});
  await prisma.gPSLocation.deleteMany({});
  await prisma.lieu.deleteMany({});

  // Seed TypeAnnonce
  const typeAnnonce1 = await prisma.typeAnnonce.create({
    data: {
      name: 'Location',
      nameAr: 'الإيجار',
      priority: 1,
    },
  });

  // Seed Category
  const category1 = await prisma.category.create({
    data: {
      name: 'Appartement',
      nameAr: 'شقة',
      typeAnnonceId: typeAnnonce1.id,
      priority: 1,
    },
  });

  // Seed SubCategory
  const subCategory1 = await prisma.subCategory.create({
    data: {
      name: 'Studio',
      nameAr: 'استوديو',
      categorieId: category1.id,
      priority: 1,
    },
  });

  // Seed Wilaya
  const wilaya1 = await prisma.wilaya.create({
    data: {
      name: 'Nouakchott',
      nameAr: 'نواكشوط',
      priority: 1,
    },
  });

  // Seed Moughataa
  const moughataa1 = await prisma.moughataa.create({
    data: {
      name: 'Tevragh Zeina',
      nameAr: 'تفرغ زينة',
      priority: 1,
    },
  });

  // Seed GPSLocation
  const gpsLocation1 = await prisma.gPSLocation.create({
    data: {
      latitude: 18.0735,
      longitude: -15.9582,
    },
  });

  // Seed Lieu
  const lieu1 = await prisma.lieu.create({
    data: {
      wilayaId: wilaya1.id,
      moughataaId: moughataa1.id,
      gpsLocationId: gpsLocation1.id,
    },
  });

  // Seed User
  const hashedPassword = await bcrypt.hash('password123', 10); // Hash the password
  const user1 = await prisma.user.create({
    data: {
      email: 'ali@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'fatima@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
    },
  });

  // Seed Annonce
  const annonce1 = await prisma.annonce.create({
    data: {
      typeAnnonceId: typeAnnonce1.id,
      categorieId: category1.id,
      lieuId: lieu1.id,
      userId: user1.id,
      subcategorieId: subCategory1.id,
      title: 'Appartement à louer',
      description: 'Un bel appartement spacieux en plein centre-ville.',
      price: 600.00,
      contact: '+22245000000',
      haveImage: true,
      firstImagePath: '/images/appartement.jpg',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const annonce2 = await prisma.annonce.create({
    data: {
      typeAnnonceId: typeAnnonce1.id,
      categorieId: category1.id,
      lieuId: lieu1.id,
      userId: user2.id,
      subcategorieId: subCategory1.id,
      title: 'Studio à louer',
      description: 'Studio moderne idéal pour étudiant.',
      price: 400.00,
      contact: '+22245000001',
      haveImage: false,
      firstImagePath: "null",
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
