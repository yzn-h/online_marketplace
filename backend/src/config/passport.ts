import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import { Strategy as LocalStrategy } from 'passport-local';
import passport from "passport"


passport.use(
    new LocalStrategy(async (username, password, done) => {
        const user = await userModel.findOne({ username })
        if (!user) {
            return done(null, false)
        }
        const isOk = await bcrypt.compare(password, user.password)
        if (isOk === true) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
)
passport.serializeUser((user:any, cb) => {
    return cb(null, user.username)
})
passport.deserializeUser(async (user, cb) => {
    let usere  = await userModel.findOne({ username: user })
    return cb(null , usere)
})


export default passport
