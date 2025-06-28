import prisma from "@/lib/global-prisma";

export async function getUser() {
  const db = await prisma.user.findMany({});
  console.log(db);
}

// async function uploadToCloudinary(file: File): Promise<string | null> {
//   const formData = new FormData();

//   return "";
// }
