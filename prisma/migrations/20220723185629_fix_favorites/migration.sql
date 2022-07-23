/*
  Warnings:

  - The `artists` column on the `Favorites` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `albums` column on the `Favorites` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tracks` column on the `Favorites` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "artists",
ADD COLUMN     "artists" TEXT[],
DROP COLUMN "albums",
ADD COLUMN     "albums" TEXT[],
DROP COLUMN "tracks",
ADD COLUMN     "tracks" TEXT[];
