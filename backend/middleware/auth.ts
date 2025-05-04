import type { Request, Response, NextFunction } from "express";
import fastJwt from "fast-jwt";
import config from "../infra/config";
import UserModel from "../models/User";

const verifier = fastJwt.createVerifier({ key: config.JWT_SECRET });

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let token: string | undefined;

	if (req.headers.authorization?.startsWith("Bearer")) {
		token = req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return res.status(401).json({ message: "Not authorized, no token" });
	}

	try {
		const decoded: { id: string } = verifier(token);
		req.user = await UserModel.findById(decoded.id).select("-password");
		next();
	} catch (error) {
		return res.status(401).json({ message: "Not authorized, token failed" });
	}
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Not authorized as admin" });
	}
};

export const provider = (req: Request, res: Response, next: NextFunction) => {
	if (req.user && (req.user.role === "provider" || req.user.role === "admin")) {
		next();
	} else {
		return res.status(403).json({ message: "Not authorized as provider" });
	}
};
