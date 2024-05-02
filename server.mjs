import dotenv from 'dotenv'
import app from './app.mjs'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', ()=> console.log('Mongo is showing love'))

app.listen(PORT, ()=> {
    console.log(`Server listening on Port: ${PORT}`)
})