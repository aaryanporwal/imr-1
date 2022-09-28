/*
  Warnings:

  - You are about to drop the column `regNo` on the `User` table. All the data in the column will be lost.
  - Added the required column `reg_no` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "regNo",
ADD COLUMN     "reg_no" TEXT NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;
