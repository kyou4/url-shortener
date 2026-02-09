import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { shortUrlSchema } from './schema'
const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql, { schema: {shortUrlSchema }
})

export { shortUrlSchema }