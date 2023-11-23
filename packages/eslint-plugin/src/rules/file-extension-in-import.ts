// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line tsdoc/syntax
/** @author Toru Nagashima See LICENSE file in root directory for full license. */

import path from 'node:path'

import { createRule } from '~/util'
import type { ImportTarget } from '~/util.plugin-n'
import { mapTypescriptExtension, visitImport } from '~/util.plugin-n'

// eslint-disable-next-line regexp/no-useless-escape, no-useless-escape
const packageNamePattern = /^[^\.\/_~].*/u // @voltiso
// const packageNamePattern = /^(?:@[^/\\]+[/\\])?[^/\\]+$/u

const corePackageOverridePattern =
	/^(?:assert|async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|http2|https|inspector|module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|trace_events|tty|url|util|v8|vm|worker_threads|zlib)[/\\]$/u

/**
 * Get all file extensions of the files which have the same basename.
 *
 * @param filePath - The path to the original file to check.
 * @returns File extensions.
 */
function getExistingExtensions(filePath: string): string[] {
	return [path.extname(filePath)]
	// const basename = path.basename(filePath, path.extname(filePath))
	// try {
	// 	// eslint-disable-next-line security/detect-non-literal-fs-filename, n/no-sync
	// 	return fs
	// 		.readdirSync(path.dirname(filePath))
	// 		.filter(
	// 			filename =>
	// 				path.basename(filename, path.extname(filename)) === basename,
	// 		)
	// 		.map(filename => path.extname(filename))
	// } catch {
	// 	return []
	// }
}

export const fileExtensionInImport = createRule<
	[string, Record<string, 'always' | 'never'>],
	string
>({
	name: 'file-extension-in-import',

	meta: {
		docs: {
			description:
				'enforce the style of file extensions in `import` declarations',

			recommended: 'recommended',
		},

		fixable: 'code',

		messages: {
			requireExt: "require file extension '{{ext}}'.",
			forbidExt: "forbid file extension '{{ext}}'.",
		},

		schema: [
			{
				type: 'string',
				enum: ['always', 'never'],
			},
			{
				type: 'object',
				properties: {},

				additionalProperties: {
					type: 'string',
					enum: ['always', 'never'],
				},
			},
		],

		type: 'suggestion',
	},

	defaultOptions: [
		'always',
		{
			'.js': 'never',
			'.jsx': 'never',
			'.ts': 'never',
			'.tsx': 'never',
		},
	],

	create(context) {
		// eslint-disable-next-line etc/no-deprecated
		if (context.getFilename().startsWith('<')) {
			return {}
		}

		const defaultStyle = context.options[0] || 'always'

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		const overrideStyle = context.options[1] || {}

		function verify({ filePath, name, node }: ImportTarget) {
			// eslint-disable-next-line no-param-reassign
			filePath ||= name

			// Ignore if it's not resolved to a file or it's a bare module.
			if (
				!filePath ||
				packageNamePattern.test(name) ||
				corePackageOverridePattern.test(name)
			) {
				return
			}

			// Get extension.
			const originalExt = path.extname(name)
			const existingExts = getExistingExtensions(filePath)
			const ext = path.extname(filePath) || existingExts.join(' or ')

			const style = overrideStyle[ext] || defaultStyle

			// Verify.
			if (style === 'always' && ext !== originalExt) {
				const fileExtensionToAdd = mapTypescriptExtension(
					context as never,
					filePath,
					ext,
				)
				context.report({
					node: node as never,
					messageId: 'requireExt',
					data: { ext: fileExtensionToAdd },

					fix(fixer) {
						if (existingExts.length !== 1) {
							return null
						}

						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						const index = node.range![1] - 1
						return fixer.insertTextBeforeRange(
							[index, index],
							fileExtensionToAdd,
						)
					},
				})
			} else if (style === 'never' && ext === originalExt) {
				context.report({
					node: node as never,
					messageId: 'forbidExt',
					data: { ext },

					fix(fixer) {
						if (existingExts.length !== 1) {
							return null
						}

						const index = name.lastIndexOf(ext)
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						const start = node.range![0] + 1 + index
						const end = start + ext.length
						return fixer.removeRange([start, end])
					},
				})
			}
		}

		return visitImport(context as never, { optionIndex: 1 }, targets => {
			for (const target of targets) {
				verify(target)
			}
		})
	},
})
