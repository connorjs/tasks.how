import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
	cacheDir: ".cache/vite",
	plugins: [tanstackStart({
		srcDirectory: ".",
		router: {
			routeFileIgnorePattern: "\\.(entry|gen)\\.",
			entry: "routes/router.entry",
			routesDirectory: "routes",
			generatedRouteTree: "routes/route_tree.gen.ts",
		},
	}), react()],
});
