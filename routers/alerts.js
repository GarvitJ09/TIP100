import express from "express";
import { addAlert, deleteAlert, getAllAlerts } from "../controllers/alerts.js";

const router = express.Router();

router.get("/", getAllAlerts);
router.post("/createalert", addAlert);
router.delete("/:id", deleteAlert);
export default router;
