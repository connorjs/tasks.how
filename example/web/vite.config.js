import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [tanstackStart({
		srcDirectory: ".",
		router: {
			entry: "router/router.js",
			routesDirectory: "routes",
			generatedRouteTree: "route_tree/route_tree.gen.js",
			disableTypes: true,
			target: "react",
		},
	}), react()],
});
