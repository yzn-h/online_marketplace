import { Request, RequestHandler, Response, NextFunction } from "express";
import { z, ZodError } from "zod"
import userModel from "../../models/user.model";

const UserSchema = z.object({
  username: z.string({ invalid_type_error: "username must be string", required_error: "username is required" }),
  password: z.string({ invalid_type_error: "password must be string", required_error: "password is required" }).min(4, "password must be atleast 4 charachters"),
  email: z.string({ invalid_type_error: "email must be string", required_error: "email is required" }).email("email data must be valid"),
  phone: z.number({ invalid_type_error: "phone must be number", required_error: "phone is required" })
})

const registerValidatMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password, email, phone } = req.body
 
  let validate = UserSchema.safeParse({ username, password, email, phone })
  if (validate.success != true) {
    res.status(400).send(validate.error.issues.map((ele) => ele.message))
  }else if ((await userModel.findOne({ email }))){
    res.status(400).send(["email is already registerd"]) 

  }
   else {
    next()
  }

};

export default registerValidatMiddleware