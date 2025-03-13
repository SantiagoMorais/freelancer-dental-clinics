-- CreateEnum
CREATE TYPE "WorkingProgress" AS ENUM ('IN_PROGRESS', 'REFUSED', 'AVAILABLE', 'FINISHED');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('INSTITUTIONAL', 'ECOMMERCE', 'SCHEDULING', 'BLOG', 'LANDING_PAGE', 'OTHERS');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'PARTIAL');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "openingHours" TEXT NOT NULL,
    "socialMedia" TEXT NOT NULL,
    "asWebSite" BOOLEAN NOT NULL DEFAULT false,
    "workingProgress" "WorkingProgress" NOT NULL,
    "lastContactedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientProjects" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "servicePrice" DOUBLE PRECISION NOT NULL,
    "serviceCategory" "ServiceCategory" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "rating" INTEGER,
    "review" TEXT,
    "websiteCreatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientProjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_address_key" ON "clients"("address");

-- AddForeignKey
ALTER TABLE "clientProjects" ADD CONSTRAINT "clientProjects_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
