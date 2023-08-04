/*Este archivo es el que arranca el servidor*/ 
import app from "./app.js"
import { connectDB } from "./db.js"

connectDB()


app.listen(3000)
console.log('servidor escuchando en el puerto')