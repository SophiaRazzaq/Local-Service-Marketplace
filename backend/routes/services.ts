import express, { type Router } from "express";
import {
	getServices,
	getServiceById,
	createService,
} from "../controllers/services";
import { protect, provider } from "../middleware/auth";

const router: Router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", protect, provider, createService);

export default router;
