import mongoose, { type Document, Schema } from "mongoose";

export interface IService extends Document {
	title: string;
	description: string;
	provider: mongoose.Schema.Types.ObjectId;
	category: mongoose.Schema.Types.ObjectId;
	price: number;
	pricingUnit: "hourly" | "fixed" | "per day";
	images: string[];
	averageRating: number;
	totalReviews: number;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		provider: { type: Schema.Types.ObjectId, ref: "Provider", required: true },
		category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
		price: { type: Number, required: true },
		pricingUnit: {
			type: String,
			enum: ["hourly", "fixed", "per day"],
			default: "hourly",
		},
		images: [{ type: String }],
		averageRating: { type: Number, default: 0 },
		totalReviews: { type: Number, default: 0 },
		isAvailable: { type: Boolean, default: true },
	},
	{ timestamps: true },
);

const ServiceModel = mongoose.model<IService>("Service", ServiceSchema);

export default ServiceModel;
