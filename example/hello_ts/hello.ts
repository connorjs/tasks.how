/**
 * Example function that says hello.
 */
export function hello(name?: string): string {
	const s = name ?? "World";
	return `Hello, ${s}!`;
}
