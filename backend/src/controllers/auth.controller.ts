import { NextFunction, Request, RequestHandler, Response } from "express";
import passport from "passport";
import IUser from "../interface/IUser";
import userModel from "../models/user.model";

class authController {
  public static login(req: Request, res: Response, next: NextFunction) {

    passport.authenticate('local', (err: any, user: IUser, info: any) => {
      if (err) throw err;
      if (!user) {
        res.status(401).send({ errors: ["something wrong with username or password"] })
      } else {
        req.logIn(user, err => {
          if (err) throw err
          res.send("Sucssfuly authed")
        })
      }
    })(req, res, next);

  };
  public static async signup(req: Request, res: Response) {
    let { username, password, email, phone } = req.body
    let user = new userModel({ username, password, email, phone })
    await user.save()
    res.sendStatus(200)
  };
  public static logout(req: Request, res: Response) {
    req.logOut((err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500)
      }
    })
    res.sendStatus(200)
  };
  public static validate(req: Request, res: Response) {
    req.isAuthenticated() ? res.sendStatus(200) : res.sendStatus(401)
  };

}

export default authController