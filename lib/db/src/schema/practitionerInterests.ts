import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const practitionerInterestsTable = pgTable("practitioner_interests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin").notNull(),
  location: text("location").notNull(),
  specialism: text("specialism").notNull(),
  yearsExperience: text("years_experience").notNull(),
  source: text("source").notNull(),
  memberName: text("member_name"),
  problem: text("problem").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPractitionerInterestSchema = createInsertSchema(practitionerInterestsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertPractitionerInterest = z.infer<typeof insertPractitionerInterestSchema>;
export type PractitionerInterest = typeof practitionerInterestsTable.$inferSelect;
