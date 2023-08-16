import express from "express";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

import "dotenv/config";
import "./passport.config";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";
import orderRoutes from "./routes/order.routes";
import config from "./config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  session({
    secret: config.sessionSecret,
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.session());

app.use("/", userRoutes);
app.use("/", addressRoutes);
app.use("/", orderRoutes);

export default app;
