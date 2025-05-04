import mongoose from "mongoose";

export interface IBooking extends mongoose.Document {
	status: "pending" | "confirmed" | "cancelled" | "completed";
	scheduledDate: Date;
	scheduledTime: { start: string; end?: string };
	location: {
		address: string;
		city: string;
		zipCode: string;
		coordinates: { latitude: number; longitude: number };
	};
	price: number;
	paymentStatus: "paid" | "unpaid" | "refunded";
	paymentMethod?: string;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;

	customer: mongoose.Schema.Types.ObjectId;
	service: mongoose.Schema.Types.ObjectId;
	provider: mongoose.Schema.Types.ObjectId;
}

const BookingSchema = new mongoose.Schema<IBooking>(
	{
		status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled", "completed"],
			default: "pending",
		},
		scheduledDate: { type: Date, required: true },
		scheduledTime: {
			start: { type: String, required: true },
			end: { type: String },
		},
		location: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			zipCode: { type: String, required: true },
			coordinates: {
				latitude: { type: Number, required: true },
				longitude: { type: Number, required: true },
			},
		},
		price: { type: Number, required: true },
		paymentStatus: {
			type: String,
			enum: ["paid", "unpaid", "refunded"],
			default: "unpaid",
		},
		paymentMethod: { type: String },
		notes: { type: String },

		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		service: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Service",
			required: true,
		},
		provider: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Provider",
			required: true,
		},
	},
	{ timestamps: true },
);

const BookingModel = mongoose.model<IBooking>("Booking", BookingSchema);

export default BookingModel;
