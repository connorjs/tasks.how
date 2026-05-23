import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [tanstackStart({
		srcDirectory: ".",
		router: {
			entry: "router/router.ts",
			routesDirectory: "routes",
			generatedRouteTree: "route_tree/route_tree.gen.ts",
		},
	}), react()],
});
