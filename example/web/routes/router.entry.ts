import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./route_tree.gen";

export function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
	});
}
