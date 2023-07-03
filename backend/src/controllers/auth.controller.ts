import { NextFunction, Request, RequestHandler, Response } from "express";
import passport from "passport";
import IUser from "../interface/IUser";

class authController{
  public static login (req: Request, res: Response,next:NextFunction) {
    
    passport.authenticate('local', (err:any, user:IUser, info:any) => {
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
  public static register (req: Request, res: Response) {
    res.send("welcome in authController");
  };
  public static logout (req: Request, res: Response) {
    res.send("welcome in authController");
  };
  public static validate (req: Request, res: Response) {
    res.send("welcome in authController");
  };

}

export default authController