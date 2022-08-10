// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-console */
/* eslint-disable n/no-sync */

// import { transpile } from 'esbuild-runner/lib/esbuild'
import * as esbuild from 'esbuild'
import flowRemoveTypes from 'flow-remove-types'
import * as path from 'node:path'

//

const librariesUsingFlow = ['react-native', '@react-native']

function isFileFlow(path: string) {
	for (const libraryName of librariesUsingFlow)
		if (path.includes(`node_modules/${libraryName}`)) return true

	return false
}

//

const librariesUsingJsx = ['react-native']

function isFileJsx(path: string) {
	for (const libraryName of librariesUsingJsx)
		if (path.includes(`node_modules/${libraryName}`)) return true

	return false
}

function getLoaderFromFilename(filename: string): string {
	const map = new Map<string, string>(
		Object.entries({
			cjs: 'js',
		}),
	)

	const extension = path.extname(filename).slice(1) as never

	const mappedValue = map.get(extension)

	if (mappedValue) return mappedValue
	else return extension
}

//

export = {
	process(source: string, filename: string) {
		// console.log({ source, filename })

		let code = source

		const isFlow = isFileFlow(filename)
		const isJsx = isFileJsx(filename)

		if (isFlow) code = flowRemoveTypes(code).toString()

		try {
			const result = esbuild.transformSync(code, {
				// target: 'node16',
				format: 'cjs',

				// loader: {
				// 	'.js': 'jsx',
				// } as never,
				// jsx: 'preserve',

				loader: isJsx ? 'jsx' : (getLoaderFromFilename(filename) as never),

				supported: {
					'async-await': false, // to make `zone.js` work (can also use the general `target: 'ES2016' setting`)
				},
			})

			for (const warning of result.warnings) {
				console.warn(warning)
			}

			code = result.code
		} catch (error) {
			console.error(
				`[@voltiso/config.jest.esr] transform: process(..., ${filename})`,
			)
			throw error
		}

		// console.log({ code })
		return { code }
		// return { code: `"use strict";\n${code}` }
	},
}
