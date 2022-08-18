import express from "express";
import { getAllTips } from "../controllers/admin.js";
const adminRouter = express.Router();

adminRouter.get("/", getAllTips);
export default adminRouter;