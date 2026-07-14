import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { profilesTable } from "./profiles";

export const gateEventsTable = pgTable("gate_events", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id")
    .notNull()
    .references(() => profilesTable.id),
  gateCode: text("gate_code"),
  status: text("status").notNull(),
  actorProfileId: integer("actor_profile_id"),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertGateEventSchema = createInsertSchema(gateEventsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertGateEvent = z.infer<typeof insertGateEventSchema>;
export type GateEvent = typeof gateEventsTable.$inferSelect;
