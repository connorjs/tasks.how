import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "TanStack Start Starter" },
		],
	}),
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument(props: { children: ReactNode }) {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body>
				{props.children}
				<Scripts />
			</body>
		</html>
	);
}

function NotFoundComponent() {
	return (
		<RootDocument>
			<main>
				<h1>Page not found</h1>
				<p>The requested route does not exist.</p>
			</main>
		</RootDocument>
	);
}
