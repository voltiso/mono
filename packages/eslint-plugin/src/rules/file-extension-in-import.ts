/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable es-x/no-array-prototype-foreach */
/* eslint-disable github/array-foreach */
// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable etc/no-deprecated */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable n/no-sync */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable tsdoc/syntax */
/* eslint-disable security/detect-unsafe-regex */

import fs from 'node:fs'
import path from 'node:path'

import type { RuleContext } from '@typescript-eslint/utils/dist/ts-eslint'
import type { Node } from 'estree'

import type ImportTarget from '~/util.plugin-n/import-target'

import mappingExtensions from '../util.plugin-n/mapping-extensions.js'
import visitImport from '../util.plugin-n/visit-import.js'

const packageNamePattern = /^(?:@[^/\\]+[/\\])?[^._~][^/\\]+$/u
// const packageNamePattern = /^(?:@[^/\\]+[/\\])?[^/\\]+$/u
const corePackageOverridePattern =
	/^(?:assert|async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|http2|https|inspector|module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|trace_events|tty|url|util|v8|vm|worker_threads|zlib)[/\\]$/u

/**
 * Get all file extensions of the files which have the same basename.
 *
 * @param filePath - The path to the original file to check.
 * @returns File extensions.
 */
function getExistingExtensions(filePath: string, extMappingList: string[]) {
	const basename = fs.existsSync(filePath)
		? path.basename(filePath, path.extname(filePath))
		: path.basename(filePath)

	try {
		const isDirectory =
			fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()

		// console.log({isDirectory})

		if (isDirectory) {
			// eslint-disable-next-line no-plusplus
			for (let i = 0, l = extMappingList.length; i < l; i++) {
				const ext = extMappingList[i]

				if (fs.existsSync(path.join(filePath, `/index${ext}`))) {
					return ['/index.js']
				}
			}
		}

		return fs
			.readdirSync(path.dirname(filePath))
			.filter(
				filename =>
					path.basename(filename, path.extname(filename)) === basename,
			)
			.map(filename => path.extname(filename))
	} catch {
		return []
	}
}

export const fileExtensionInImport = {
	create(context: RuleContext<string, unknown[]>) {
		if (context.getFilename().startsWith('<')) {
			return {}
		}
		const defaultStyle = context.options[0] || 'always'
		const overrideStyle = context.options[1] || {}
		const extMapping =
			// @ts-expect-error ...
			overrideStyle.extMapping || mappingExtensions.mappingDefault
		const extMappingList = Object.keys(extMapping)

		function verify({
			filePath,
			name,
			node,
		}: {
			filePath: string
			name: string
			node: Node
		}) {
			// console.log('!', filePath, name)

			const isDirectory =
				fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()

			// console.log({isDirectory}, packageNamePattern.test(name))

			// Ignore if it's not resolved to a file or it's a bare module.
			if (
				!filePath ||
				packageNamePattern.test(name) ||
				corePackageOverridePattern.test(name)
			) {
				// console.log('ignore')
				return
			}

			// Get extension.
			const originalExt = path.extname(name)
			// eslint-disable-next-line no-nested-ternary
			const resolvedExt = isDirectory
				? null
				: fs.existsSync(filePath)
					? path.extname(filePath)
					: null
			const existingExts = getExistingExtensions(filePath, extMappingList)
			if (!resolvedExt && existingExts.length !== 1) {
				// Ignore if the file extension could not be determined one.
				return
			}
			// @ts-expect-error ...
			const ext = mappingExtensions(resolvedExt || existingExts[0], extMapping)
			// @ts-expect-error ...
			const style = overrideStyle[ext] || defaultStyle
			// Verify.
			if (style === 'always' && ext !== originalExt) {
				context.report({
					data: { ext },

					fix(fixer) {
						if (existingExts.length !== 1) {
							return null
						}
						// @ts-expect-error ...
						const index = node.range[1] - 1

						return fixer.insertTextBeforeRange([index, index], ext as never)
					},

					messageId: 'requireExt',
					node,
				})
			} else if (style === 'never' && ext === originalExt) {
				context.report({
					data: { ext },

					fix(fixer) {
						if (existingExts.length !== 1) {
							return null
						}
						const index = name.lastIndexOf(ext)
						// @ts-expect-error ...
						const start = node.range[0] + 1 + index
						const end = start + ext.length

						return fixer.removeRange([start, end])
					},

					messageId: 'forbidExt',
					node,
				})
			}
		}

		return visitImport(
			context as never,
			{ optionIndex: 1 },
			(targets: ImportTarget[]) => {
				targets.forEach(verify as never)
			},
		)
	},

	meta: {
		docs: {
			category: 'Stylistic Issues',

			description:
				'enforce the style of file extensions in `import` declarations',

			recommended: false,
			url: 'https://github.com/mysticatea/eslint-plugin-node/blob/v11.1.0/docs/rules/file-extension-in-import.md',
		},

		fixable: 'code',

		messages: {
			forbidExt: "forbid file extension '{{ext}}'.",
			requireExt: "require file extension '{{ext}}'.",
		},

		schema: [
			{
				enum: ['always', 'never'],
			},
			{
				additionalProperties: {
					enum: ['always', 'never'],
				},

				properties: {
					extMapping: mappingExtensions.schema,
					includeTypeOnly: { type: 'boolean' },
				},

				type: 'object',
			},
		],

		type: 'suggestion',
	},
}
