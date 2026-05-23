import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../route_tree/route_tree.gen.ts'

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
	})
}
