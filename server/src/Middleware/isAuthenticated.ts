import { NextFunction, Request, Response } from "express";
import User from "../Model/User";

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.user) {
    const userId = req.session.user;
    const user = await User.findOne({ id: userId, verified:true });
    if (user) {
      next();
    } else {
      res.status(401).json({ success: false, message: "access denied" });
    }
  }
}

export default isAuthenticated;
