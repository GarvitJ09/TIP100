import express from "express";
import { getAllAdmin, signup, login } from "../controllers/admin.js";
const adminRouter = express.Router();

adminRouter.get("/", getAllAdmin);
adminRouter.post("/signup", signup);
adminRouter.post("/login", login);
export default adminRouter;
