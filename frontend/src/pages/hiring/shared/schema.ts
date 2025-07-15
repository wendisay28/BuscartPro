import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // musician, actor, photographer, designer, etc.
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull(),
  pricePerHour: integer("price_per_hour").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  isOnline: boolean("is_online").notNull().default(false),
  profileImage: text("profile_image"),
  specialties: text("specialties").array(),
  description: text("description"),
});

export const offers = pgTable("offers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  artistType: text("artist_type").notNull(),
  eventLocation: text("event_location").notNull(),
  eventTime: timestamp("event_time").notNull(),
  budget: integer("budget").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("active"), // active, completed, cancelled
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const artistResponses = pgTable("artist_responses", {
  id: serial("id").primaryKey(),
  offerId: integer("offer_id").references(() => offers.id),
  artistId: integer("artist_id").references(() => artists.id),
  proposedPrice: integer("proposed_price").notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"), // pending, accepted, rejected, negotiating
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertArtistSchema = createInsertSchema(artists).omit({
  id: true,
});

export const insertOfferSchema = createInsertSchema(offers).omit({
  id: true,
  createdAt: true,
}).extend({
  eventTime: z.string().min(1, "La fecha y hora son requeridas"),
});

export const insertArtistResponseSchema = createInsertSchema(artistResponses).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type Artist = typeof artists.$inferSelect;

export type InsertOffer = z.infer<typeof insertOfferSchema>;
export type Offer = typeof offers.$inferSelect;

export type InsertArtistResponse = z.infer<typeof insertArtistResponseSchema>;
export type ArtistResponse = typeof artistResponses.$inferSelect;
