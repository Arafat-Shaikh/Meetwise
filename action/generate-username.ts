"use server";

import { generateUniqueUsername } from "@/lib/utils";
import { z } from "zod";

const inputSchema = z.object({
  fullName: z.string().min(1),
});

export async function getUniqueUsername(data: { fullName: string }) {
  const validated = inputSchema.parse(data);
  const username = await generateUniqueUsername(validated.fullName);
  return username;
}
