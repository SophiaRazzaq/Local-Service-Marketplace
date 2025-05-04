import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tsconfigPaths(), react(), tailwindcss()],
	build: { outDir: "build" },
	server: {
		open: true,
		port: 3000,
	},
});
