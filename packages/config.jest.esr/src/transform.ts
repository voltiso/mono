// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { transpile } from 'esbuild-runner/lib/esbuild'

export = {
	process(source: string, filename: string) {
		const code = transpile(source, filename, {
			type: 'transform',

			esbuild: {
				// target: 'ES2016',
				supported: {
					'async-await': false, // to make `zone.js` work
				},
			},
		})
		// return { code }
		return { code: `"use strict";\n${code}` }
	},
}
