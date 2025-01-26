/*
  Warnings:

  - Added the required column `subcategorieId` to the `Annonce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" ADD COLUMN     "subcategorieId" INTEGER NOT NULL;
