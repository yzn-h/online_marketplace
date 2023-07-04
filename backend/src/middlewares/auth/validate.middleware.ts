import { Request, RequestHandler, Response , NextFunction } from "express";

const validateMiddleware: RequestHandler = (req: Request, res: Response , next :NextFunction) => {
  if(!req.isAuthenticated()){
   return res.sendStatus(401)
  }
  next()
};

export default validateMiddleware