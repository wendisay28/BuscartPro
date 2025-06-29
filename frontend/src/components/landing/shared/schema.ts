import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Definir el esquema manualmente para evitar problemas de inferencia
export const insertUserSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: number;
  username: string;
  password: string;
};
