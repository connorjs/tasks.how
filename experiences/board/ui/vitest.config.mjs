// TODO: AI: vitest.config.mjs should use vite.config.js I thought... unless this is a result from mikn/rules_typescript
//  From AI: This file is intentionally a local Vitest config, not the app's Vite bundle config. Keeping it as `.mjs` avoids needing `"type": "module"` in `package.json`, and `rules_typescript` accepts any config label we pass to `ts_test`.
export default {
	resolve: {
		// Bazel test runfiles are symlink-heavy. Preserving symlink paths keeps
		// Vitest on the runfiles tree instead of chasing realpaths that do not
		// exist inside the sandbox.
		preserveSymlinks: true,
	},
};
