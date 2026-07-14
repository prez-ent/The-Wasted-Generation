import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const clientEnquiriesTable = pgTable("client_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  companySize: text("company_size").notNull(),
  problem: text("problem").notNull(),
  timeline: text("timeline").notNull(),
  source: text("source").notNull(),
  referrerName: text("referrer_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertClientEnquirySchema = createInsertSchema(clientEnquiriesTable).omit({
  id: true,
  createdAt: true,
});
export type InsertClientEnquiry = z.infer<typeof insertClientEnquirySchema>;
export type ClientEnquiry = typeof clientEnquiriesTable.$inferSelect;
