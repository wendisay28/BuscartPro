import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
  uuid,
  pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (Required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User types
export const userTypeEnum = pgEnum("user_type", ["general", "artist", "company"]);

// User storage table (Required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  userType: userTypeEnum("user_type").default("general").notNull(),
  bio: text("bio"),
  city: varchar("city"),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Categories for artists/events
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 50 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Artist profiles
export const artists = pgTable("artists", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  artistName: varchar("artist_name", { length: 100 }).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  subcategories: text("subcategories").array(),
  tags: text("tags").array(),
  artistType: varchar("artist_type"), // solista, grupo, colectivo, duo
  presentationType: text("presentation_type").array(), // en_vivo, online, pregrabado
  serviceTypes: text("service_types").array(), // shows, clases, eventos, sesiones, otros
  pricePerHour: decimal("price_per_hour", { precision: 10, scale: 2 }),
  experience: varchar("experience"), // principiante, intermedio, profesional, referente
  description: text("description"),
  portfolio: jsonb("portfolio"), // images/videos
  isAvailable: boolean("is_available").default(true),
  canTravel: boolean("can_travel").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: integer("total_reviews").default(0),
  fanCount: integer("fan_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  organizerId: varchar("organizer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  subcategories: text("subcategories").array(),
  tags: text("tags").array(),
  eventType: varchar("event_type"), // gratuito, pago, online
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: text("location"),
  city: varchar("city"),
  isOutdoor: boolean("is_outdoor").default(false),
  isAccessible: boolean("is_accessible").default(false),
  capacity: integer("capacity"),
  price: decimal("price", { precision: 10, scale: 2 }),
  requiresReservation: boolean("requires_reservation").default(false),
  purchaseLink: text("purchase_link"),
  multimedia: jsonb("multimedia"), // images/videos
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: integer("total_reviews").default(0),
  attendeeCount: integer("attendee_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Venues/Sites
export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  ownerId: varchar("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  venueType: varchar("venue_type"), // galeria, cafe_cultural, sala_conciertos, etc
  services: text("services").array(),
  address: text("address").notNull(),
  city: varchar("city").notNull(),
  openingHours: jsonb("opening_hours"),
  contact: jsonb("contact"),
  multimedia: jsonb("multimedia"), // images/videos
  coordinates: jsonb("coordinates"), // lat, lng
  dailyRate: decimal("daily_rate", { precision: 10, scale: 2 }),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: integer("total_reviews").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Recommendations/Requests
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  authorId: varchar("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  tags: text("tags").array(),
  city: varchar("city"),
  estimatedDate: timestamp("estimated_date"),
  isActive: boolean("is_active").default(true),
  responseCount: integer("response_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  authorId: varchar("author_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: text("featured_image"),
  category: varchar("category"),
  tags: text("tags").array(),
  visibility: varchar("visibility").default("public"), // public, followers, collaborators
  likeCount: integer("like_count").default(0),
  commentCount: integer("comment_count").default(0),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Favorites
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetType: varchar("target_type").notNull(), // artist, event, venue, blog_post
  targetId: integer("target_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  reviewerId: varchar("reviewer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetType: varchar("target_type").notNull(), // artist, event, venue
  targetId: integer("target_id").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  canReview: boolean("can_review").default(false), // only if contracted/attended
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Real-time hiring requests
export const hiringRequests = pgTable("hiring_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: varchar("client_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").references(() => categories.id),
  description: text("description").notNull(),
  city: varchar("city").notNull(),
  eventDate: timestamp("event_date").notNull(),
  eventTime: varchar("event_time"),
  minBudget: decimal("min_budget", { precision: 10, scale: 2 }),
  maxBudget: decimal("max_budget", { precision: 10, scale: 2 }),
  additionalDetails: text("additional_details"),
  status: varchar("status").default("active"), // active, closed, completed
  responseCount: integer("response_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Hiring responses
export const hiringResponses = pgTable("hiring_responses", {
  id: serial("id").primaryKey(),
  requestId: uuid("request_id").notNull().references(() => hiringRequests.id, { onDelete: "cascade" }),
  artistId: integer("artist_id").notNull().references(() => artists.id, { onDelete: "cascade" }),
  responseType: varchar("response_type").notNull(), // accept, counteroffer, reject
  proposedPrice: decimal("proposed_price", { precision: 10, scale: 2 }),
  message: text("message"),
  status: varchar("status").default("pending"), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

// Messages
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: varchar("sender_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  receiverId: varchar("receiver_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  messageType: varchar("message_type").default("text"), // text, hiring_request, contract
  relatedId: varchar("related_id"), // related hiring request or contract id
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many, one }) => ({
  artists: many(artists),
  events: many(events),
  venues: many(venues),
  recommendations: many(recommendations),
  blogPosts: many(blogPosts),
  favorites: many(favorites),
  reviews: many(reviews),
  hiringRequests: many(hiringRequests),
  sentMessages: many(messages, { relationName: "sentMessages" }),
  receivedMessages: many(messages, { relationName: "receivedMessages" }),
}));

export const artistsRelations = relations(artists, ({ one, many }) => ({
  user: one(users, { fields: [artists.userId], references: [users.id] }),
  category: one(categories, { fields: [artists.categoryId], references: [categories.id] }),
  hiringResponses: many(hiringResponses),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  organizer: one(users, { fields: [events.organizerId], references: [users.id] }),
  category: one(categories, { fields: [events.categoryId], references: [categories.id] }),
}));

export const venuesRelations = relations(venues, ({ one }) => ({
  owner: one(users, { fields: [venues.ownerId], references: [users.id] }),
}));

export const recommendationsRelations = relations(recommendations, ({ one }) => ({
  author: one(users, { fields: [recommendations.authorId], references: [users.id] }),
  category: one(categories, { fields: [recommendations.categoryId], references: [categories.id] }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, { fields: [blogPosts.authorId], references: [users.id] }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  reviewer: one(users, { fields: [reviews.reviewerId], references: [users.id] }),
}));

export const hiringRequestsRelations = relations(hiringRequests, ({ one, many }) => ({
  client: one(users, { fields: [hiringRequests.clientId], references: [users.id] }),
  category: one(categories, { fields: [hiringRequests.categoryId], references: [categories.id] }),
  responses: many(hiringResponses),
}));

export const hiringResponsesRelations = relations(hiringResponses, ({ one }) => ({
  request: one(hiringRequests, { fields: [hiringResponses.requestId], references: [hiringRequests.id] }),
  artist: one(artists, { fields: [hiringResponses.artistId], references: [artists.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, { fields: [messages.senderId], references: [users.id], relationName: "sentMessages" }),
  receiver: one(users, { fields: [messages.receiverId], references: [users.id], relationName: "receivedMessages" }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ createdAt: true, updatedAt: true });
export const insertArtistSchema = createInsertSchema(artists).omit({ id: true, createdAt: true, updatedAt: true, rating: true, totalReviews: true, fanCount: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true, updatedAt: true, rating: true, totalReviews: true, attendeeCount: true });
export const insertVenueSchema = createInsertSchema(venues).omit({ id: true, createdAt: true, updatedAt: true, rating: true, totalReviews: true });
export const insertRecommendationSchema = createInsertSchema(recommendations).omit({ id: true, createdAt: true, updatedAt: true, responseCount: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true, updatedAt: true, likeCount: true, commentCount: true });
export const insertFavoriteSchema = createInsertSchema(favorites).omit({ id: true, createdAt: true });
export const insertReviewSchema = createInsertSchema(reviews).omit({ id: true, createdAt: true, updatedAt: true });
export const insertHiringRequestSchema = createInsertSchema(hiringRequests).omit({ id: true, createdAt: true, responseCount: true });
export const insertHiringResponseSchema = createInsertSchema(hiringResponses).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertArtist = z.infer<typeof insertArtistSchema>;
export type Artist = typeof artists.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Venue = typeof venues.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertHiringRequest = z.infer<typeof insertHiringRequestSchema>;
export type HiringRequest = typeof hiringRequests.$inferSelect;
export type InsertHiringResponse = z.infer<typeof insertHiringResponseSchema>;
export type HiringResponse = typeof hiringResponses.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type Category = typeof categories.$inferSelect;
