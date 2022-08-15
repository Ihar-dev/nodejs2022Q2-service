/*
  Warnings:

  - You are about to drop the column `tracks` on the `Favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "tracks";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "favoriteId" TEXT;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
