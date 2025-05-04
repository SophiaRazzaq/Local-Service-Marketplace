import mongoose, { type Document, Schema } from "mongoose";

export interface IReview extends Document {
	booking: mongoose.Schema.Types.ObjectId;
	customer: mongoose.Schema.Types.ObjectId;
	provider: mongoose.Schema.Types.ObjectId;
	service: mongoose.Schema.Types.ObjectId;
	rating: number;
	comment?: string;
	images: string[];
	reply?: {
		text: string;
		date: Date;
	};
	createdAt: Date;
	updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
	{
		booking: {
			type: Schema.Types.ObjectId,
			ref: "Booking",
			required: true,
		},
		customer: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		provider: {
			type: Schema.Types.ObjectId,
			ref: "Provider",
			required: true,
		},
		service: {
			type: Schema.Types.ObjectId,
			ref: "Service",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		comment: {
			type: String,
		},
		images: [
			{
				type: String,
			},
		],
		reply: {
			text: String,
			date: Date,
		},
	},
	{ timestamps: true },
);

const ReviewModel = mongoose.model<IReview>("Review", ReviewSchema);

export default ReviewModel;
