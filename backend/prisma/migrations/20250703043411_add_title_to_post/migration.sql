/*
  Warnings:

  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
