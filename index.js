import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
import router from "./routers/alerts.js";
import adminRouter from "./routers/admin.js";
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/alerts", router);
app.use("/api/admin", adminRouter);
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    app.listen(PORT);
  })
  .then(() => {
    console.log("Conected to database and Listening to local host 5000");
  })
  .catch((err) => {
    console.log(err);
  });
