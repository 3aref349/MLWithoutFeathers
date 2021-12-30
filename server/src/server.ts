import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth";
import typeDocRoutes from "./routes/typedoc";
import typeSurveyRoutes from "./routes/typesurvey";
import archiveRoutes from "./routes/archive";

import stationsRoutes from "./routes/stations";

import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.get("/", (req, res) => res.send("Hello World"));
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/doc", typeDocRoutes);
app.use("/api/survey", typeSurveyRoutes);
app.use("/api/archive", archiveRoutes);
// app.use("/api/serial", serialRoutes);
app.use("/api/stations", stationsRoutes);



app.listen(5000, async () => {
  console.log("Server Is running at http://localhost/5000");
  try {
    await createConnection();
    console.log("DataBase connected!");
  } catch (err) {
    console.log(err);
    console.log(err);
  }
});
