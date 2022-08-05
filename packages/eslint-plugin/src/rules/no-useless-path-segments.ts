// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable tsdoc/syntax */

/**
 * @file Ensures that there are no useless path segments
 * @author Thomas Grainger
 */

import { getFileExtensions } from 'eslint-module-utils/ignore'
import moduleVisitor from 'eslint-module-utils/moduleVisitor'
import resolve from 'eslint-module-utils/resolve'
import path from 'node:path'

import { createRule } from '~/util'

/**
 * Convert a potentially relative path from node utils into a true relative path.
 *
 * ../ -> .. ./ -> . .foo/bar -> ./.foo/bar ..foo/bar -> ./..foo/bar foo/bar -> ./foo/bar
 *
 * @param relativePath - Relative posix path potentially missing leading './'
 * @returns Relative posix path that always starts with a ./
 */
function toRelativePath(relativePath: string): string {
	// eslint-disable-next-line regexp/require-unicode-regexp
	const stripped = relativePath.replace(/\/$/g, '') // Remove trailing /

	// eslint-disable-next-line regexp/prefer-named-capture-group, regexp/require-unicode-regexp
	return /^((\.\.)|(\.))($|\/)/.test(stripped) ? stripped : `./${stripped}`
}

function normalize(fn: string) {
	return toRelativePath(path.posix.normalize(fn))
}

function countRelativeParents(pathSegments: string[]) {
	// eslint-disable-next-line unicorn/no-array-reduce
	return pathSegments.reduce(
		(sum, pathSegment) => (pathSegment === '..' ? sum + 1 : sum),
		0,
	)
}

export const noUselessPathSegments = createRule<
	[{ noUselessIndex: boolean }],
	never
>({
	meta: {
		type: 'suggestion',

		messages: {},

		docs: {
			description: 'removes useless path segments',
			recommended: 'warn',
		},

		fixable: 'code',

		schema: [
			{
				type: 'object',

				properties: {
					commonjs: { type: 'boolean' },
					noUselessIndex: { type: 'boolean' },
				},

				additionalProperties: false,
			},
		],
	},

	name: 'no-useless-path-segments',
	defaultOptions: [{ noUselessIndex: false }],

	create(context) {
		const currentDir = path.dirname(
			context.getPhysicalFilename
				? context.getPhysicalFilename()
				: context.getFilename(),
		)
		const options = context.options[0]

		function checkSourceValue(source: { value: string }) {
			const { value: importPath } = source

			function reportWithProposedPath(proposedPath: string) {
				context.report({
					node: source as never,
					// Note: Using messageIds is not possible due to the support for ESLint 2 and 3
					// @ts-expect-error legacy
					message: `Useless path segments for "${importPath}", should be "${proposedPath}"`,
					// messageId: 'uselessPathSegments',

					fix: fixer =>
						(proposedPath &&
							// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
							fixer.replaceText(
								source as never,
								JSON.stringify(proposedPath),
							)) ||
						null,
				})
			}

			// // Only relative imports are relevant for this rule --> Skip checking
			// if (!importPath.startsWith('.')) {
			// 	return
			// }

			// Report rule violation if path is not the shortest possible
			const resolvedPath = resolve(importPath, context)
			const normedPath = normalize(importPath)
			const resolvedNormedPath = resolve(normedPath, context)

			if (normedPath !== importPath && resolvedPath === resolvedNormedPath) {
				reportWithProposedPath(normedPath)
				return
			}

			const fileExtensions = getFileExtensions(context.settings)
			// eslint-disable-next-line security/detect-non-literal-regexp
			const regexUnnecessaryIndex = new RegExp(
				// eslint-disable-next-line unicorn/prefer-spread
				`.*\\/index(\\${Array.from(fileExtensions).join('|\\')})?$`,
			)

			// Check if path contains unnecessary index (including a configured extension)
			if (
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				options &&
				options.noUselessIndex &&
				regexUnnecessaryIndex.test(importPath)
			) {
				const parentDirectory = path.dirname(importPath)

				// Try to find ambiguous imports
				if (parentDirectory !== '.' && parentDirectory !== '..') {
					for (const fileExtension of fileExtensions) {
						if (resolve(`${parentDirectory}${fileExtension}`, context)) {
							reportWithProposedPath(`${parentDirectory}/`)
							return
						}
					}
				}

				reportWithProposedPath(parentDirectory)
				return
			}

			// Path is shortest possible + starts from the current directory --> Return directly
			if (importPath.startsWith('./')) {
				return
			}

			// Path is not existing --> Return directly (following code requires path to be defined)
			if (!resolvedPath) {
				return
			}

			const expected = path.relative(currentDir, resolvedPath) // Expected import path
			const expectedSplit = expected.split(path.sep) // Split by / or \ (depending on OS)
			// eslint-disable-next-line regexp/require-unicode-regexp
			const importPathSplit = importPath.replace(/^\.\//, '').split('/')
			const countImportPathRelativeParents =
				countRelativeParents(importPathSplit)
			const countExpectedRelativeParents = countRelativeParents(expectedSplit)
			const diff = countImportPathRelativeParents - countExpectedRelativeParents

			// Same number of relative parents --> Paths are the same --> Return directly
			if (diff <= 0) {
				return
			}

			// Report and propose minimal number of required relative parents
			reportWithProposedPath(
				toRelativePath(
					importPathSplit
						.slice(0, countExpectedRelativeParents)
						// eslint-disable-next-line unicorn/prefer-spread
						.concat(
							importPathSplit.slice(countImportPathRelativeParents + diff),
						)
						.join('/'),
				),
			)
		}

		return moduleVisitor(checkSourceValue, options)
	},
})
