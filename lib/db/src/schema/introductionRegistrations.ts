import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const introductionRegistrationsTable = pgTable("introduction_registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  introductionType: text("introduction_type").notNull(),
  whoIntroducing: text("who_introducing").notNull(),
  relationshipContext: text("relationship_context").notNull(),
  contactMade: text("contact_made").notNull(),
  registeredAt: timestamp("registered_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertIntroductionRegistrationSchema = createInsertSchema(introductionRegistrationsTable).omit({
  id: true,
  registeredAt: true,
});
export type InsertIntroductionRegistration = z.infer<typeof insertIntroductionRegistrationSchema>;
export type IntroductionRegistration = typeof introductionRegistrationsTable.$inferSelect;
