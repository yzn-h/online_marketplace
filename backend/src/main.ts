import express from 'express'
import 'dotenv/config'
import homeRouter from "./routes/home.router"
import mongoose from 'mongoose'
import passport from 'passport'
import session from "express-session"
import "./config/passport"
import MongoStore from 'connect-mongo'
import cors from "cors"
const app = express()
const port = 3000


app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials :true
}))

app.use(session({
    secret: process.env.SESSION_SECRET || "hellow",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING
    })
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(homeRouter)


async function bootstrap() {
    mongoose.connect((process.env.DB_STRING || ""))

    app.listen(port, () => {
        console.log(`localhost:${port}`)
    })
}
bootstrap()