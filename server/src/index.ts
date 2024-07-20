import express, { Express, Request, Response } from "express";
const morgan = require("morgan");
import dotenv from "dotenv";
const session = require("express-session");
const cookieParser = require("cookie-parser");
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import authRouter from "./routes/auth";
import noteRouter from "./routes/note";
import tagRouter from "./routes/tag";
import { connectDB } from "../Database/Database";

dotenv.config();

const sessionSecretKey = process.env.SESSION_SECRET_KEY;

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
connectDB();

app.use(
  session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using https
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/tags", tagRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "This is server home" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
