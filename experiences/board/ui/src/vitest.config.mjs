// TODO: AI: vitest.config.mjs should use vite.config.js I thought... unless this is a result from mikn/rules_typescript
export default {
	resolve: {
		// Bazel test runfiles are symlink-heavy. Preserving symlink paths keeps
		// Vitest on the runfiles tree instead of chasing realpaths that do not
		// exist inside the sandbox.
		preserveSymlinks: true,
	},
};
