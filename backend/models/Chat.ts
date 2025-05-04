import mongoose from "mongoose";

export interface IChat {
	participants: mongoose.Schema.Types.ObjectId[];
	booking: mongoose.Schema.Types.ObjectId;
	lastMessage: {
		text: string;
		sender: mongoose.Schema.Types.ObjectId;
		timestamp: Date;
	};

	createdAt: Date;
	updatedAt: Date;
}

const ChatSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		booking: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Booking",
		},
		lastMessage: {
			text: String,
			sender: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			timestamp: Date,
		},
	},
	{ timestamps: true },
);

const ChatModel = mongoose.model<IChat>("Chat", ChatSchema);

export default ChatModel;
