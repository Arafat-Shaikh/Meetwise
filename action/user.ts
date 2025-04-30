import prisma from "@/lib/global-prisma";

export async function getUser() {
  const db = await prisma.user.findMany({});
  console.log(db);
}
