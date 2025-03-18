/*
  Warnings:

  - You are about to drop the column `asWebSite` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "asWebSite",
DROP COLUMN "phone",
ADD COLUMN     "hasAnWebSite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mobilePhoneNumber" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "socialMedia" DROP NOT NULL;
