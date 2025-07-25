import { pgTable, serial, varchar, text, timestamp, boolean, integer, numeric, jsonb, date, uniqueIndex, AnyPgColumn } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: varchar('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  password: varchar('password'), // Contraseña hasheada
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name'),
  displayName: varchar('display_name'), // Para nombre artístico o nombre de empresa
  profileImageUrl: varchar('profile_image_url'),
  coverImageUrl: varchar('cover_image_url'),
  userType: varchar('user_type', { enum: ['general', 'artist', 'company'] }).notNull().default('general'),
  bio: text('bio'),
  city: varchar('city'),
  address: text('address'),
  phone: varchar('phone'),
  website: varchar('website'),
  socialMedia: jsonb('social_media'), // { facebook, instagram, twitter, tiktok, youtube }
  isVerified: boolean('is_verified').default(false),
  isFeatured: boolean('is_featured').default(false),
  isAvailable: boolean('is_available').default(true), // Para artistas
  rating: numeric('rating', { precision: 3, scale: 2 }).default('0.00'),
  totalReviews: integer('total_reviews').default(0),
  fanCount: integer('fan_count').default(0), // Número de veces guardado en favoritos
  preferences: jsonb('preferences').default({}), // Preferencias de notificaciones, etc.
  settings: jsonb('settings').default({}), // Configuraciones de privacidad, etc.
  lastActive: timestamp('last_active'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const artists = pgTable('artists', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  // Información básica
  artistName: varchar('artist_name').notNull(),
  stageName: varchar('stage_name'),
  categoryId: integer('category_id').references(() => categories.id),
  subcategories: text('subcategories').array().default([]),
  tags: text('tags').array().default([]),
  artistType: varchar('artist_type', { enum: ['solo', 'duo', 'trio', 'band', 'collective'] }),
  presentationType: text('presentation_type').array().default([]), // En vivo, online, grabado
  serviceTypes: text('service_types').array().default([]), // Shows, talleres, etc.
  
  // Información profesional
  experience: integer('experience'), // Nivel de experiencia: 1=principiante, 2=intermedio, 3=profesional, 4=experto
  yearsOfExperience: integer('years_of_experience'),
  description: text('description'),
  bio: text('bio'),
socialMedia: jsonb('social_media').default({}), // 👈 AÑADIDO AQUÍ
  
  // Multimedia
  portfolio: jsonb('portfolio').default({}),
  videoPresentation: varchar('video_presentation_url'),
  gallery: jsonb('gallery').default([]),
  
  // Ubicación y disponibilidad
  baseCity: varchar('base_city'),
  travelAvailability: boolean('travel_availability').default(false),
  travelDistance: integer('travel_distance'), // en km
  availability: jsonb('availability').default({}), // Disponibilidad por días/horas
  
  // Precios y servicios
  pricePerHour: numeric('price_per_hour', { precision: 10, scale: 2 }).default(sql`0`),
  priceRange: jsonb('price_range'), // { min: number, max: number, currency: string }
  services: jsonb('services').default(sql`'[]'::jsonb`), // Array de servicios ofrecidos
  
  // Estadísticas
  rating: numeric('rating', { precision: 3, scale: 2 }).default(sql`0`),
  totalReviews: integer('total_reviews').default(sql`0`),
  fanCount: integer('fan_count').default(sql`0`),
  viewCount: integer('view_count').default(sql`0`),
  
  // Configuración
  isAvailable: boolean('is_available').default(true),
  isProfileComplete: boolean('is_profile_complete').default(false),
  isVerified: boolean('is_verified').default(false),
  
  // Metadata
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  organizerId: varchar('organizer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  companyId: integer('company_id').references(() => companies.id, { onDelete: 'cascade' }),
  venueId: integer('venue_id').references(() => venues.id, { onDelete: 'set null' }),
  
  // Información básica
  title: varchar('title').notNull(),
  slug: varchar('slug').notNull().unique(),
  description: text('description'),
  shortDescription: varchar('short_description', { length: 300 }),
  
  // Categorización
  categoryId: integer('category_id').references(() => categories.id),
  subcategories: text('subcategories').array().default(sql`'{}'`),
  tags: text('tags').array().default(sql`'{}'`),
  eventType: varchar('event_type', { 
    enum: ['concert', 'exhibition', 'workshop', 'festival', 'conference', 'theater', 'dance', 'other'] 
  }),
  
  // Fechas y horarios
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  timezone: varchar('timezone').default('America/Bogota'),
  isRecurring: boolean('is_recurring').default(false),
  recurrencePattern: jsonb('recurrence_pattern'), // Para eventos recurrentes
  
  // Ubicación
  locationType: varchar('location_type', { enum: ['physical', 'online', 'hybrid'] }).default('physical'),
  address: text('address'),
  city: varchar('city'),
  state: varchar('state'),
  country: varchar('country'),
  coordinates: jsonb('coordinates'), // { lat: number, lng: number }
  onlineEventUrl: varchar('online_event_url'),
  
  // Información del lugar
  venueName: varchar('venue_name'),
  venueDescription: text('venue_description'),
  venueCapacity: integer('venue_capacity'),
  isOutdoor: boolean('is_outdoor').default(false),
  
  // Información de entradas
  isFree: boolean('is_free').default(false),
  ticketPrice: numeric('ticket_price', { precision: 10, scale: 2 }),
  ticketUrl: varchar('ticket_url'),
  capacity: integer('capacity'),
  availableTickets: integer('available_tickets'),
  
  // Multimedia
  featuredImage: varchar('featured_image'),
  gallery: jsonb('gallery').default(sql`'[]'`),
  videoUrl: varchar('video_url'),
  
  // Estado y visibilidad
  status: varchar('status', { 
    enum: ['draft', 'published', 'cancelled', 'postponed', 'completed'] 
  }).default('draft'),
  isFeatured: boolean('is_featured').default(false),
  isVerified: boolean('is_verified').default(false),
  isOnline: boolean('is_online').default(false),
  
  // Estadísticas
  viewCount: integer('view_count').default(sql`0`),
  saveCount: integer('save_count').default(sql`0`),
  shareCount: integer('share_count').default(sql`0`),
  
  // Metadata
  seoTitle: varchar('seo_title'),
  seoDescription: text('seo_description'),
  seoKeywords: text('seo_keywords'),
  
  // Fechas de creación/actualización
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Tabla para guardar eventos recurrentes generados
export const eventOccurrences = pgTable('event_occurrences', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  status: varchar('status', { enum: ['scheduled', 'cancelled', 'completed'] }).default('scheduled'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  
  // Información básica
  companyName: varchar('company_name').notNull(),
  legalName: varchar('legal_name'),
  taxId: varchar('tax_id'),
  description: text('description'),
  shortDescription: varchar('short_description', { length: 300 }),
  
  // Categorización
  companyType: varchar('company_type', { 
    enum: ['cultural_space', 'theater', 'museum', 'gallery', 'bar', 'restaurant', 'event_venue', 'other'] 
  }),
  categories: text('categories').array().default(sql`'{}'`),
  subcategories: text('subcategories').array().default(sql`'{}'`),
  tags: text('tags').array().default(sql`'{}'`),
  
  // Contacto e información de negocio
  contactPerson: varchar('contact_person'),
  phone: varchar('phone'),
  email: varchar('email'),
  website: varchar('website'),
  socialMedia: jsonb('social_media').default(sql`'{}'`),
  
  // Ubicación
  address: text('address'),
  city: varchar('city'),
  state: varchar('state'),
  country: varchar('country'),
  postalCode: varchar('postal_code'),
  coordinates: jsonb('coordinates'), // { lat: number, lng: number }
  
  // Servicios y características
  services: jsonb('services').default(sql`'[]'`), // Array de servicios ofrecidos
  amenities: jsonb('amenities').default(sql`'[]'`), // Comodidades del lugar
  capacity: integer('capacity'),
  rooms: jsonb('rooms').default(sql`'[]'`), // Salas o espacios disponibles
  
  // Horarios
  openingHours: jsonb('opening_hours').default(sql`'{}'`),
  is24h: boolean('is_24h').default(false),
  
  // Tarifas
  priceRange: jsonb('price_range'), // { min: number, max: number, currency: string, description?: string }
  depositRequired: boolean('deposit_required').default(false),
  depositAmount: numeric('deposit_amount', { precision: 10, scale: 2 }),
  
  // Multimedia
  logoUrl: varchar('logo_url'),
  coverPhotoUrl: varchar('cover_photo_url'),
  gallery: jsonb('gallery').default(sql`'[]'`), // Array de URLs de imágenes
  videoTourUrl: varchar('video_tour_url'),
  
  // Estadísticas
  rating: numeric('rating', { precision: 3, scale: 2 }).default(sql`0`),
  totalReviews: integer('total_reviews').default(sql`0`),
  viewCount: integer('view_count').default(sql`0`),
  saveCount: integer('save_count').default(sql`0`), // Veces guardado en favoritos
  
  // Verificación y estado
  isVerified: boolean('is_verified').default(false),
  isProfileComplete: boolean('is_profile_complete').default(false),
  isActive: boolean('is_active').default(true),
  
  // Metadata
  metadata: jsonb('metadata').default(sql`'{}'`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const venues = pgTable('venues', {
  id: serial('id').primaryKey(),
  companyId: integer('company_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
  name: varchar('name').notNull(),
  description: text('description'),
  venueType: varchar('venue_type'),
  services: text('services').array().default(sql`'{}'`),
  address: text('address'),
  city: varchar('city'),
  openingHours: jsonb('opening_hours').default(sql`'{}'`),
  contact: jsonb('contact').default(sql`'{}'`),
  multimedia: jsonb('multimedia').default(sql`'{}'`),
  coordinates: jsonb('coordinates'),
  dailyRate: numeric('daily_rate', { precision: 10, scale: 2 }),
  capacity: integer('capacity'),
  isAvailable: boolean('is_available').default(true),
  rating: numeric('rating', { precision: 3, scale: 2 }).default(sql`0`),
  totalReviews: integer('total_reviews').default(sql`0`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const recommendations = pgTable('recommendations', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  artistId: integer('artist_id').references(() => artists.id, { onDelete: 'cascade' }),
  eventId: integer('event_id').references(() => events.id, { onDelete: 'cascade' }),
  venueId: integer('venue_id').references(() => venues.id, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  content: text('content').notNull(),
  type: varchar('type', { enum: ['artist', 'event', 'venue'] }).notNull(),
  score: numeric('score', { precision: 3, scale: 2 }).default(sql`0`),
  isApproved: boolean('is_approved').default(true),
  likeCount: integer('like_count').default(sql`0`),
  replyCount: integer('reply_count').default(sql`0`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  authorId: varchar('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  // Información básica
  title: varchar('title').notNull(),
  slug: varchar('slug').notNull().unique(),
  subtitle: varchar('subtitle'),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  readingTime: integer('reading_time'), // Tiempo estimado de lectura en minutos
  
  // Categorización
  category: varchar('category'),
  subcategories: text('subcategories').array().default(sql`'{}'`),
  tags: text('tags').array().default(sql`'{}'`),
  
  // Multimedia
  featuredImage: varchar('featured_image'),
  gallery: jsonb('gallery').default(sql`'[]'`),
  videoUrl: varchar('video_url'),
  
  // Estadísticas
  viewCount: integer('view_count').default(sql`0`),
  likeCount: integer('like_count').default(sql`0`),
  commentCount: integer('comment_count').default(sql`0`),
  shareCount: integer('share_count').default(sql`0`),
  saveCount: integer('save_count').default(sql`0`), // Guardado en favoritos
  
  // Visibilidad y estado
  visibility: varchar('visibility', { 
    enum: ['public', 'private', 'draft', 'archived'] 
  }).default('draft'),
  allowComments: boolean('allow_comments').default(true),
  isFeatured: boolean('is_featured').default(false),
  isVerified: boolean('is_verified').default(false),
  
  // SEO
  seoTitle: varchar('seo_title'),
  seoDescription: text('seo_description'),
  seoKeywords: text('seo_keywords'),
  
  // Fechas
  publishedAt: timestamp('published_at'),
  scheduledAt: timestamp('scheduled_at'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Tabla para los comentarios del blog
export const blogComments = pgTable('blog_comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => blogPosts.id, { onDelete: 'cascade' }),
  authorId: varchar('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: integer('parent_id').references((): AnyPgColumn => blogComments.id, { onDelete: 'cascade' }), // Para respuestas anidadas
  content: text('content').notNull(),
  isApproved: boolean('is_approved').default(true),
  likeCount: integer('like_count').default(sql`0`),
  replyCount: integer('reply_count').default(sql`0`),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Tabla para los likes en publicaciones del blog
export const blogPostLikes = pgTable('blog_post_likes', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => blogPosts.id, { onDelete: 'cascade' }),
  userId: varchar('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  // Asegura que un usuario solo pueda dar like una vez por publicación
  postUserIdx: uniqueIndex('post_user_idx').on(table.postId, table.userId),
}));

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => users.id),
  artistId: integer('artist_id').references(() => artists.id),
  eventId: integer('event_id').references(() => events.id),
  venueId: integer('venue_id').references(() => venues.id),
  type: varchar('type', { enum: ['artist', 'event', 'venue'] }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => users.id),
  artistId: integer('artist_id').references(() => artists.id),
  eventId: integer('event_id').references(() => events.id),
  venueId: integer('venue_id').references(() => venues.id),
  type: varchar('type', { enum: ['artist', 'event', 'venue'] }).notNull(),
  score: numeric('score').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const hiringRequests = pgTable('hiring_requests', {
  id: serial('id').primaryKey(),
  clientId: varchar('client_id').notNull().references(() => users.id),
  artistId: integer('artist_id').references(() => artists.id),
  venueId: integer('venue_id').references(() => venues.id),
  details: text('details').notNull(),
  eventDate: date('event_date').notNull(),
  status: varchar('status', { enum: ['open', 'in_progress', 'completed', 'cancelled'] }).default('open'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const featuredItems = pgTable('featured_items', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title').notNull(),
  description: text('description'),
  url: text('url').notNull(),
  type: varchar('type', { enum: ['youtube', 'spotify', 'vimeo', 'soundcloud', 'other'] }).notNull(),
  thumbnailUrl: text('thumbnail_url'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const hiringResponses = pgTable('hiring_responses', {
  id: serial('id').primaryKey(),
  requestId: integer('request_id').notNull().references(() => hiringRequests.id),
  artistId: integer('artist_id').notNull().references(() => artists.id),
  proposal: text('proposal').notNull(),
  message: text('message'),
  status: varchar('status', { enum: ['open', 'in_progress', 'completed', 'cancelled'] }).default('open'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: varchar('sender_id').notNull().references(() => users.id),
  receiverId: varchar('receiver_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const offers = pgTable('offers', {
  id: serial('id').primaryKey(),
  clientId: varchar('client_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  artistId: integer('artist_id').references(() => artists.id, { onDelete: 'cascade' }),
  category: varchar('category').notNull(),
  description: text('description').notNull(),
  budgetMin: numeric('budget_min', { precision: 12, scale: 2 }),
  budgetMax: numeric('budget_max', { precision: 12, scale: 2 }),
  modality: varchar('modality', { enum: ['presencial', 'online', 'ambas'] }).default('presencial'),
  eventDate: timestamp('event_date'),
  eventTime: varchar('event_time'),
  location: text('location'),
  status: varchar('status', { 
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'] 
  }).default('pending'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});