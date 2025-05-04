import express, { type Router, type Request, type Response } from "express";
import { createReview, getProviderReviews } from "../controllers/reviews";
import { protect } from "../middleware/auth";

const router: Router = express.Router();

router.post("/", protect, (req: Request, res: Response) =>
	createReview(req, res),
);
router.get("/provider/:providerId", (req: Request, res: Response) =>
	getProviderReviews(req, res),
);

export default router;
