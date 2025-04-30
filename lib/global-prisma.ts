import { PrismaClient } from "./generated/prisma";

declare global {
  // Prevent multiple instances of PrismaClient in development
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}

export default prisma;
