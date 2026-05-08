export default {
	resolve: {
		// Bazel test runfiles are symlink-heavy. Preserving symlink paths keeps
		// Vitest on the runfiles tree instead of chasing realpaths that do not
		// exist inside the sandbox.
		preserveSymlinks: true,
	},
};
