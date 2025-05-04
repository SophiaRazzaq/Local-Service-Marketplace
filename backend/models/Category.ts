import mongoose from "mongoose";

export interface ICategory {
	name: string;
	description?: string;
	icon?: string;

	createdAt?: Date;
	updatedAt?: Date;
}

const CategorySchema = new mongoose.Schema<ICategory>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
		icon: {
			type: String,
		},
	},
	{ timestamps: true },
);

const CategoryModel = mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel;
