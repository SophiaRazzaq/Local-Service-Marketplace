import "dotenv/config";

export default {
	mongoURI: process.env.MONGO_URI || "",
	port: process.env.PORT || 5000,
	isProd: process.env.NODE_ENV === "production",
	HASH_SECRET: process.env.HASH_SECRET as string,
	JWT_SECRET: process.env.JWT_SECRET as string,
};
