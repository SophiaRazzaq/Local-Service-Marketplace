import { defineConfig } from "@rspack/cli";
import nodeExternals from "webpack-node-externals";

export default defineConfig({
	target: "node",
	mode: process.env.NODE_ENV || "development",
	entry: {
		server: "./backend/server.ts",
	},
	output: {
		clean: true,
	},
	externals: [nodeExternals()],
	resolve: { extensions: [".ts", ".js"] },
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "typescript",
						},
					},
				},
				type: "javascript/auto",
			},
		],
	},
});
