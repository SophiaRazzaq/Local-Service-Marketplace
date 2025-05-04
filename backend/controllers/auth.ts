import type { Request, Response } from "express";
import UserModel from "../models/User";
import ProviderModel from "../models/Provider";
import config from "../infra/config";
import fastJwt from "fast-jwt";

const sign = fastJwt.createSigner({ key: config.JWT_SECRET, expiresIn: "30d" });

const generateToken = (id: string) => {
	return sign({ id });
};

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password, role, phone } = req.body;

		const userExists = await UserModel.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await UserModel.create({
			name,
			email,
			password,
			role,
			phone,
		});

		if (role === "provider") {
			await ProviderModel.create({
				user: user._id,
			});
		}

		if (user) {
			res.status(201).json({
				token: generateToken(user._id.toString()),
				user: {
					_id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
				},
			});
		} else {
			res.status(400).json({ message: "Invalid user data" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isMatch = await user.isValidPassword(password);

		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		res.json({
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
			token: generateToken(user._id.toString()),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getProfile = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Not authorized" });
	}

	try {
		const user = await UserModel.findById(req.user._id).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
