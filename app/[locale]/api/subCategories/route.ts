import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('CategoryId');

  if (!categoryId) {
    return NextResponse.json(
      { error: 'Category ID is required' },
      { status: 400 }
    );
  }

  try {
    const subCategories = await prisma.subCategory.findMany({
      where: {
        categorieId: parseInt(categoryId),
      },
    });

    return NextResponse.json(subCategories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching subcategories' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
