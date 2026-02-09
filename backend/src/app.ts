import { Context, Hono } from 'hono'
import redisClient from '../redis'
import { cors } from 'hono/cors'
import { getUrlDataByIndex,getUrlDataByUrl, insertToDb } from './handler/database'
import { decodeShortenUrl, shortenUrl } from './handler/url'
import { checkRedis } from './handler/database'
import { IUrlResponse } from '../types'
const app = new Hono()
app.use('*', cors({
  origin: 'http://localhost:5173'
}))

app.post('/urlgenerate', async (c:Context) => {
   const { url } = await c.req.json() 
   
   if (!url) {
      return c.json({ success: false, error: 'URL is required' }, 400)
    }

    try {
      const shortUrlFromRedis = await checkRedis(url)

      if(shortUrlFromRedis){
        
        return c.json({
            success:true,
            shortUrl:`http://localhost:3000/${shortUrlFromRedis}`
          })}

      const data = (await getUrlDataByUrl(url))
      

      if(data && data.id){
        const shortUrl = shortenUrl(data.id);

        await redisClient.set(url,shortUrl);

        return c.json({
            success:true,
            shortUrl:`http://localhost:3000/${shortUrl}`
          })
      } else {
        const newIndex = (await insertToDb(url)).id;

        const newShortUrl = shortenUrl(newIndex);

        await redisClient.set(url,newShortUrl);
        await redisClient.set(newShortUrl,url);

        return c.json({
          success:true,
          shortUrl:`http://localhost:3000/${newShortUrl}`
        })
      }
  
      

        } catch (error) {
          console.log(error)
    return c.json({error}, 500);
  }
})

app.get('/:shortenUrl', async (c: Context) => {
  const { shortenUrl } = c.req.param()

  const originalUrl = await checkRedis(shortenUrl);
  
  
  if(originalUrl){
    return c.redirect(originalUrl,301)
  }

  const originalIndex = decodeShortenUrl(shortenUrl);

  const urlData = await getUrlDataByIndex(originalIndex) as IUrlResponse;

  if(urlData){
    await redisClient.set(urlData.originalUrl,shortenUrl);
    await redisClient.set(shortenUrl,urlData.originalUrl);
    return c.redirect(urlData.originalUrl, 301)
  } else {
    return  c.json({success: false, message: 'Route not found'}, 404)
  }
})


export default app