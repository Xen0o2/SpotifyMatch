/*
  Warnings:

  - A unique constraint covering the columns `[idRoom]` on the table `MatchRoom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idRoom` to the `MatchRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `MatchRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchRoom" ADD COLUMN     "idRoom" INTEGER NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MatchRoom_idRoom_key" ON "MatchRoom"("idRoom");
