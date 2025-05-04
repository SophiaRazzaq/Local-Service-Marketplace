import express from "express";
import "dotenv/config";
import path from "node:path";

const app = express();

const isProd = process.env.NODE_ENV === "production";
if (isProd) {
	const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
	const indexFile = path.join(frontendBuildPath, "index.html");

	app.use(express.static(frontendBuildPath));
	app.get("/{*all}", (req, resp) => {
		resp.sendFile(indexFile);
	});
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
