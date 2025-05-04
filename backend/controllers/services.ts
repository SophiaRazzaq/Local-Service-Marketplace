import type { Request, Response } from "express";
import Service from "../models/Service";
import Provider from "../models/Provider";

interface ServiceRequest extends Request {
	query: {
		page?: string;
		keyword?: string;
		category?: string;
	};
}

export const getServices = async (
	req: ServiceRequest,
	res: Response,
): Promise<void> => {
	try {
		const pageSize = 10;
		const page = Number(req.query.page) || 1;

		const keyword = req.query.keyword
			? {
					title: {
						$regex: req.query.keyword,
						$options: "i",
					},
				}
			: {};

		const category = req.query.category ? { category: req.query.category } : {};

		const count = await Service.countDocuments({ ...keyword, ...category });

		const services = await Service.find({ ...keyword, ...category })
			.populate("provider", "businessName averageRating")
			.populate("category", "name")
			.limit(pageSize)
			.skip(pageSize * (page - 1))
			.sort({ createdAt: -1 });

		res.json({
			services,
			page,
			pages: Math.ceil(count / pageSize),
			total: count,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getServiceById = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const service = await Service.findById(req.params.id)
			.populate("provider", "businessName averageRating totalReviews user")
			.populate("category", "name")
			.populate({
				path: "provider",
				populate: {
					path: "user",
					select: "name profileImage",
				},
			});

		if (!service) {
			return res.status(404).json({ message: "Service not found" });
		}

		res.json(service);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Provider
export const createService = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { title, description, category, price, pricingUnit, images } =
			req.body;

		const provider = await Provider.findOne({ user: req.user._id });

		if (!provider) {
			res.status(404).json({ message: "Provider profile not found" });
			return;
		}

		const service = await Service.create({
			title,
			description,
			provider: provider._id,
			category,
			price,
			pricingUnit,
			images,
		});

		provider.services.push(service._id);
		await provider.save();

		res.status(201).json(service);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
