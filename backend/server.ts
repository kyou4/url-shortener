import app from "./src/app"

const port = 3000

export default { 
  port: port,
  fetch: app.fetch, 
} 
console.log(`Server is running on ${port}`)