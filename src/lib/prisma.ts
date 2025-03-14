import { PrismaClient } from "@prisma/client";

// This file manages the creation and reuse of the Prisma Client instance.
// In development environments, it reuses the same instance (cache) to avoid multiple database connections.
// In production, it creates a new instance to ensure performance and efficiency.

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

// db gonna be used to call the database
export const db = prisma;
