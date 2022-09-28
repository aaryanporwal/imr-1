-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "regNo" TEXT NOT NULL,
    "state_council" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "father_name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
