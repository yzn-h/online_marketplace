import { Request, RequestHandler, Response } from "express";

class HomeController{
  public static index (req: Request, res: Response) {
    res.send("welcome in home !");
  };

}

export default HomeController