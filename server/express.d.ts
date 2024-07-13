import { IUser } from "./src/Model/User";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
