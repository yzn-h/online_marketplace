import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import { Strategy as LocalStrategy } from 'passport-local';
import passport from "passport"

passport.use(
    new LocalStrategy({usernameField:"email",passwordField:"password"},async (email, password, done) => {
        const user = await userModel.findOne({ email })
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
    return cb(null, user.id)
})
passport.deserializeUser(async (user, cb) => {
    let usere  = await userModel.findOne({ _id:user })
    return cb(null , usere)
})


export default passport
