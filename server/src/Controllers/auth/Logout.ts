import { Request, Response } from "express";

const Logout = (req: Request, res: Response) => {
  let errorCode: number | null = null;
  try {
    console.log(req.session);
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Logout failed" });
      }
      res.clearCookie("userId");
      res.send("Logged out successfully");
    });
  } catch (err) {
    return res.json({ success: false, message: "Logout failed" });
  }
};

export default Logout;
