import express from "express";
import path from "node:path";
import config from "./infra/config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

mongoose
	.connect(config.mongoURI, {
		dbName: "marketplace",
	})
	.then(() => {
		console.log("MongoDB connected");
	}).catch((err) => {
    console.error("MongoDB connection error:", err);
  }

if (config.isProd) {
	const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
	const indexFile = path.join(frontendBuildPath, "index.html");

	app.use(express.static(frontendBuildPath));
	app.get("/{*all}", (req, resp) => {
		resp.sendFile(indexFile);
	});
}

const server = app.listen(config.port, () => {
	console.log(`Server is running on port ${config.port}`);
});
