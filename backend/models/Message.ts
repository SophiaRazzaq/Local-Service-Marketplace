import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
	chat: mongoose.Schema.Types.ObjectId;
	sender: mongoose.Schema.Types.ObjectId;
	text: string;
	attachments: string[];
	readBy: {
		user: mongoose.Schema.Types.ObjectId;
		readAt: Date;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const MessageSchema = new mongoose.Schema(
	{
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		attachments: [
			{
				type: String,
			},
		],
		readBy: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				readAt: Date,
			},
		],
	},
	{ timestamps: true },
);

export default MessageSchema;
