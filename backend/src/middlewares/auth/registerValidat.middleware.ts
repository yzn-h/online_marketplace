import { Request, RequestHandler, Response, NextFunction } from "express";
import { z } from "zod"
const registerValidatMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {

  next()
};

export default registerValidatMiddleware