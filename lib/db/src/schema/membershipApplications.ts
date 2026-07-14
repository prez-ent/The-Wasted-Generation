import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const membershipApplicationsTable = pgTable("membership_applications", {
  id: serial("id").primaryKey(),
  careerHistory: text("career_history").notNull(),
  problemsSolved: text("problems_solved").notNull(),
  dayRate: integer("day_rate").notNull(),
  referee1: text("referee_1").notNull(),
  referee2: text("referee_2").notNull(),
  contractingEntity: text("contracting_entity").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMembershipApplicationSchema = createInsertSchema(membershipApplicationsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertMembershipApplication = z.infer<typeof insertMembershipApplicationSchema>;
export type MembershipApplication = typeof membershipApplicationsTable.$inferSelect;
