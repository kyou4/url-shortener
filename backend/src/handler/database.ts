import { db } from "../db/client"
import { eq } from "drizzle-orm"
import { shortUrlSchema } from "../db/client"
import { IUrlResponse } from "../../types"
import redisClient from "../../redis"

// We get back the id
export const insertToDb = async (url: string): Promise<IUrlResponse> => {
    const [result] = await db.insert(shortUrlSchema).values({ 
        originalUrl: url,
    }).returning();
    
    return result
}
export const getUrlDataByUrl = async (url:string) => {
    const [row] = await db.select().from(shortUrlSchema).where(eq(shortUrlSchema.originalUrl, url)).limit(1)
    return row;
}
export const getUrlDataByIndex = async (index:number) => {
    const [row] =await db.select().from(shortUrlSchema).where(eq(shortUrlSchema.id,index)).limit(1)
    return row
}

export const checkRedis = async (url:string)=>{
    const exist = await redisClient.get(url)
    return exist;
}

