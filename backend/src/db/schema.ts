import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'

export const shortUrlSchema = pgTable('shortUrl', {
  id: serial('id').primaryKey(),
  originalUrl: varchar('originalUrl', { length: 999 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})