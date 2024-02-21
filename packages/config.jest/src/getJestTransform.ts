// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-console */
/* eslint-disable n/no-sync */

// import * as fs from 'node:fs'

import * as path from 'node:path'

import * as esbuild from 'esbuild'
import flowRemoveTypes from 'flow-remove-types'

//

const reactNativePaths = ['react-native', '@react-native']

function isFileReactNative(path: string) {
	for (const libraryName of reactNativePaths)
		if (path.includes(`node_modules/${libraryName}`)) return true

	return false
}

//

const librariesUsingJsx = ['react-native', '@react-native/virtualized-lists']

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

// // eslint-disable-next-line unicorn/prefer-module
// const isCjs = typeof require === 'function'

// console.log('config.jest/transform', { isCjs })

export function getJestTransform(options?: { format?: 'cjs' | 'esm' }) {
	return {
		process(source: string, filename: string) {
			// console.log('config.jest/transform', { filename })

			let code = source

			const isReactNative = isFileReactNative(filename)
			const isJsx = isFileJsx(filename)

			// if(isFlow) console.log('isFlow', filename)

			if (isReactNative) code = flowRemoveTypes(code).toString()

			const isTs = filename.endsWith('.ts') || filename.endsWith('.tsx')

			try {
				const result = esbuild.transformSync(code, {
					// target: 'node16',

					...(isTs && options?.format ? { format: options.format } : {}),

					// override: always transpile react-native sources to cjs (for now?)
					...(isReactNative ? { format: 'cjs' } : {}),

					sourcemap: true,
					sourcesContent: false,
					sourcefile: filename,

					// loader: {
					// 	'.js': 'jsx',
					// } as never,
					// jsx: 'preserve',

					loader: isJsx ? 'jsx' : (getLoaderFromFilename(filename) as never),

					supported: {
						'async-await': false, // to make `zone.js` work (can also use the general `target: 'ES2016'` setting)
						decorators: false,
					},
				})

				for (const warning of result.warnings) {
					console.warn(warning)
				}

				// console.log('MAP', result.map)

				// console.error('CODE', result.code)
				// fs.writeFileSync('/home/atablash/dupa.js', result.code)

				// result.code = 'notGood'

				return result
			} catch (error) {
				console.error(
					`[@voltiso/config.jest] transform: process(..., ${filename})`,
				)
				throw error
			}
		},
	}
}
