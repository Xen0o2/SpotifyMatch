/*
  Warnings:

  - You are about to drop the `_MatchRoomToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MatchRoomToUser" DROP CONSTRAINT "_MatchRoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchRoomToUser" DROP CONSTRAINT "_MatchRoomToUser_B_fkey";

-- DropTable
DROP TABLE "_MatchRoomToUser";

-- CreateTable
CREATE TABLE "_Participants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LikedUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Participants_AB_unique" ON "_Participants"("A", "B");

-- CreateIndex
CREATE INDEX "_Participants_B_index" ON "_Participants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LikedUsers_AB_unique" ON "_LikedUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedUsers_B_index" ON "_LikedUsers"("B");

-- AddForeignKey
ALTER TABLE "_Participants" ADD CONSTRAINT "_Participants_A_fkey" FOREIGN KEY ("A") REFERENCES "MatchRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Participants" ADD CONSTRAINT "_Participants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedUsers" ADD CONSTRAINT "_LikedUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "MatchRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedUsers" ADD CONSTRAINT "_LikedUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
