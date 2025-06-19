import { z } from "zod";

export const userSchema = z.object({
  clerkId: z.string().uuid(),
});

export type User = z.infer<typeof userSchema>;
