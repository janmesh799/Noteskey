import session from "express-session";
import { IUser } from "./src/Model/User";
interface CustomSession extends Session {
  user: {
    userId: string;
  };
}

declare module "express-session" {
  interface SessionData {
    user: { [key: string]: any };
  }
}

declare module "express-serve-static-core" {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}

