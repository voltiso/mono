/* eslint-disable jest/require-hook */
/* eslint-disable @typescript-eslint/no-var-requires */

// Object.defineProperty(exports, '__esModule', { value: true })

const { transpile } = require('esbuild-runner')
// @ts-expect-error no types
require('esbuild-runner/register')

/**
 * @param {string} src
 * @param {string} filename
 */
function process(src, filename) {
	const code = transpile(src, filename, {
		type: 'transform',
		// debug: true,
		esbuild: {
			target: 'es2016', // no async/await - will use monkey-patched zone.js Promises

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore types bug?
			banner: '"use strict"',
		},
	})
	return { code }
}

module.exports = { process }
