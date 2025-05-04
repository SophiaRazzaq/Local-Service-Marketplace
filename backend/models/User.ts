import mongoose from "mongoose";
import argon2 from "@node-rs/argon2";
import { randomBytes } from "node:crypto";
import config from "../infra/config";

export interface IUser extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	role: "customer" | "provider" | "admin";
	phone: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
		coordinates: { latitude: number; longitude: number };
	};
	profileImage: string;
	dateJoined: Date;
	isVerified: boolean;

	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ["customer", "provider", "admin"],
			default: "customer",
		},
		phone: { type: String },
		address: {
			street: String,
			city: String,
			state: String,
			zipCode: String,
			country: String,
			coordinates: {
				latitude: { type: Number },
				longitude: { type: Number },
			},
		},
		profileImage: { type: String },
		dateJoined: { type: Date, default: Date.now },
		isVerified: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

const SECRET = Buffer.from(config.HASH_SECRET, "hex");

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return;

	try {
		const salt = randomBytes(16);
		const hashed = await argon2.hash(this.password, {
			salt,
			secret: SECRET,
		});
		this.password = hashed;
	} catch (error) {
		next(error as Error);
	}
});

UserSchema.methods.isValidPassword = async function (plainText: string) {
	return await argon2.verify(this.password, plainText, {
		secret: SECRET,
	});
};

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
