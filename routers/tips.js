import express from "express";
import { getAllTips, viewTip, clearTip } from "../controllers/tips.js";
const adminRouter = express.Router();

adminRouter.get("/", getAllTips);
adminRouter.get("/:id", viewTip);
adminRouter.delete("/:id", clearTip);

export default adminRouter;
