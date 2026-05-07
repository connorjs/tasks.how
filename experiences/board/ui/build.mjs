import path from 'node:path';
import { copyFile } from 'node:fs/promises';

import { build } from 'esbuild';

const [entryPoint, tsconfig, htmlInput, jsOutput, htmlOutput] = process.argv.slice(2);
const runfilesRoot = process.env.JS_BINARY__RUNFILES;

if (!runfilesRoot) {
	throw new Error('Expected JS_BINARY__RUNFILES to be set by rules_js.');
}

await build({
	bundle: true,
	entryPoints: [entryPoint],
	format: 'esm',
	nodePaths: [path.join(runfilesRoot, '_main', 'node_modules')],
	outfile: jsOutput,
	platform: 'browser',
	sourcemap: true,
	tsconfig,
});

await copyFile(htmlInput, htmlOutput);
