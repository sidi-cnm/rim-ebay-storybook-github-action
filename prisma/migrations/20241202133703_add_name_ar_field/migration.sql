-- AlterTable
ALTER TABLE "_AnnonceImages" ADD CONSTRAINT "_AnnonceImages_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AnnonceImages_AB_unique";
