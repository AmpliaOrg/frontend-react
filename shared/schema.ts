import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const ongLeads = pgTable("ong_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  cnpj: text("cnpj").notNull(),
  phone: text("phone").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const insertOngLeadSchema = createInsertSchema(ongLeads).pick({
  name: true,
  email: true,
  cnpj: true,
  phone: true,
});

export type InsertOngLead = z.infer<typeof insertOngLeadSchema>;
export type OngLead = typeof ongLeads.$inferSelect;

