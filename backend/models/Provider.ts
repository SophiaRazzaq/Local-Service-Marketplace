import mongoose, { type Document, Schema } from "mongoose";

export interface IProvider extends Document {
	user: mongoose.Schema.Types.ObjectId;
	businessName?: string;
	description?: string;
	services: Array<mongoose.Schema.Types.ObjectId>;
	workingHours: Record<
		| "monday"
		| "tuesday"
		| "wednesday"
		| "thursday"
		| "friday"
		| "saturday"
		| "sunday",
		{ start: string; end: string; closed: boolean }
	>;
	portfolio: {
		title: string;
		description: string;
		image: string;
	}[];

	averageRating: number;
	totalReviews: number;
	verified: boolean;
	licenses: {
		name: string;
		number: string;
		expiryDate: Date;
		verificationStatus: "pending" | "verified" | "rejected";
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const ProviderSchema = new Schema<IProvider>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		businessName: {
			type: String,
		},
		description: {
			type: String,
		},
		services: [
			{
				type: Schema.Types.ObjectId,
				ref: "Service",
			},
		],
		workingHours: {
			monday: { start: String, end: String, closed: Boolean },
			tuesday: { start: String, end: String, closed: Boolean },
			wednesday: { start: String, end: String, closed: Boolean },
			thursday: { start: String, end: String, closed: Boolean },
			friday: { start: String, end: String, closed: Boolean },
			saturday: { start: String, end: String, closed: Boolean },
			sunday: { start: String, end: String, closed: Boolean },
		},
		portfolio: [
			{
				title: String,
				description: String,
				image: String,
			},
		],
		averageRating: {
			type: Number,
			default: 0,
		},
		totalReviews: {
			type: Number,
			default: 0,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		licenses: [
			{
				name: String,
				number: String,
				expiryDate: Date,
				verificationStatus: {
					type: String,
					enum: ["pending", "verified", "rejected"],
					default: "pending",
				},
			},
		],
	},
	{ timestamps: true },
);

const ProviderModel = mongoose.model<IProvider>("Provider", ProviderSchema);

export default ProviderModel;
