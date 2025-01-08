import { z } from "zod";

export const schema = z
  .object({
    email: z.string().email("Format d'email invalide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type signUpFields = z.infer<typeof schema>;
