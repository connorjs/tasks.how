import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	cacheDir: ".cache/vite",
	plugins: [
		tsconfigPaths({
			projects: [fileURLToPath(new URL("../../tsconfig.json", import.meta.url))],
		}),
		tanstackStart({
			srcDirectory: ".",
			router: {
				routeFileIgnorePattern: "\\.(entry|gen)\\.",
				entry: "routes/router.entry",
				routesDirectory: "routes",
				generatedRouteTree: "routes/route_tree.gen.ts",
			},
		}),
		react(),
	],
});
