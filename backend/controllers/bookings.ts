import type { Request, Response } from "express";
import Booking from "../models/Booking";
import Service from "../models/Service";
import Provider from "../models/Provider";
import Chat from "../models/Chat";

export const createBooking = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Not authorized" });
	}

	try {
		const { serviceId, scheduledDate, scheduledTime, location, notes } =
			req.body;

		const service = await Service.findById(serviceId).populate("provider");

		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		const booking = await Booking.create({
			customer: req.user._id,
			service: serviceId,
			provider: service.provider._id,
			scheduledDate,
			scheduledTime,
			location,
			notes,
			price: service.price,
		});

		await Chat.create({
			participants: [req.user._id, service.provider.user],
			booking: booking._id,
		});

		res.status(201).json(booking);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getBookings = async (req: Request, res: Response) => {
	try {
		let bookings;
		if (!req.user) {
			return res.status(401).json({ message: "Not authorized" });
		}
		const userRole = req.user.role;

		if (userRole === "customer") {
			bookings = await Booking.find({ customer: req.user._id })
				.populate("service", "title price")
				.populate({
					path: "provider",
					select: "businessName",
					populate: {
						path: "user",
						select: "name",
					},
				})
				.sort({ createdAt: -1 });
		} else if (userRole === "provider") {
			const provider = await Provider.findOne({ user: req.user._id });

			if (!provider) {
				return res.status(404).json({ message: "Provider profile not found" });
			}

			bookings = await Booking.find({ provider: provider._id })
				.populate("service", "title price")
				.populate("customer", "name")
				.sort({ createdAt: -1 });
		}

		res.json(bookings);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
