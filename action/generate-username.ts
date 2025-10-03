"use server";

import { slugifyName } from "@/lib/utils";
import prisma from "@/lib/global-prisma";
import { z } from "zod";
import { nanoid } from "nanoid";

const inputSchema = z.object({
  fullName: z.string().min(1),
});

export async function getUniqueUsername(data: { fullName: string }) {
  const validated = inputSchema.parse(data);

  const base = slugifyName(validated.fullName);

  const existing = await prisma.user.findUnique({
    where: { username: base },
  });

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
