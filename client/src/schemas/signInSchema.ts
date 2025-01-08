import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Format d'email invalide"),
  password: z.string(),
});

export type signInFields = z.infer<typeof schema>;
