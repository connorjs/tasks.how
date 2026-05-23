import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../routes/route_tree.gen.js'

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
	})
}
