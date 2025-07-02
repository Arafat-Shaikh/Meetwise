import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "@/lib/global-prisma";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugifyName(fullName: string) {
  return fullName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export async function generateUniqueUsername(
  fullName: string
): Promise<string> {
  const base = slugifyName(fullName);

  const existing = await prisma.user.findUnique({
    where: { username: base },
  });

  // const myName = "arafat-shaikh";
  // const existing = true; // yeah same name

  if (!existing) return base;

  let username = "";
  let exists = true;

  while (exists) {
    const suffix = nanoid(6);
    username = `${base}${suffix}`;
    const user = await prisma.user.findUnique({ where: { username } });
    exists = !!user;
  }

  return username;
}
