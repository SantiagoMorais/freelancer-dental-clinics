-- DropForeignKey
ALTER TABLE "clientProjects" DROP CONSTRAINT "clientProjects_clientId_fkey";

-- AddForeignKey
ALTER TABLE "clientProjects" ADD CONSTRAINT "clientProjects_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
