import express, { type Request, type Response, type Router } from "express";
import { protect } from "../middleware/auth";
import Booking from "../models/Booking";
import Stripe from "stripe";
import config from "../infra/config";

const stripe = new Stripe(config.STRIPE_SECRET, {
	apiVersion: "2025-04-30.basil",
});

const router: Router = express.Router();

router.post(
	"/create-payment-intent",
	protect,
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { bookingId } = req.body;

			// Find booking
			const booking = await Booking.findById(bookingId);

			if (!booking) {
				return res.status(404).json({ message: "Booking not found" });
			}

			// Check if booking belongs to user
			if (booking.customer.toString() !== req.user._id.toString()) {
				return res.status(403).json({ message: "Not authorized" });
			}

			// Create payment intent
			const paymentIntent = await stripe.paymentIntents.create({
				amount: booking.price * 100, // Stripe works with cents
				currency: "usd",
				metadata: {
					bookingId: booking._id.toString(),
				},
			});

			res.json({
				clientSecret: paymentIntent.client_secret,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
);

router.put("/update-status/:bookingId", protect, async (req, res) => {
	try {
		const { paymentStatus, paymentMethod } = req.body;

		const booking = await Booking.findById(req.params.bookingId);

		if (!booking) {
			return res.status(404).json({ message: "Booking not found" });
		}

		booking.paymentStatus = paymentStatus;
		booking.paymentMethod = paymentMethod;

		if (paymentStatus === "paid") {
			booking.status = "confirmed";
		}

		const updatedBooking = await booking.save();

		res.json(updatedBooking);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
