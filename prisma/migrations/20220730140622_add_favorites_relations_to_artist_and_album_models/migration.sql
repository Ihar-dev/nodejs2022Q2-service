/*
  Warnings:

  - You are about to drop the column `albums` on the `Favorites` table. All the data in the column will be lost.
  - You are about to drop the column `artists` on the `Favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "favoriteId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "favoriteId" TEXT;

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "albums",
DROP COLUMN "artists";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
