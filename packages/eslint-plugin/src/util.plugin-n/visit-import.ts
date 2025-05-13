// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable tsdoc/syntax */

import * as path from 'node:path'

import type { RuleListener } from '@typescript-eslint/utils/ts-eslint'
import type { Rule } from 'eslint'
import isCoreModule from 'is-core-module'

import getResolvePaths from './get-resolve-paths.js'
import ImportTarget from './import-target.js'
import stripImportPathParams from './strip-import-path-params.js'

/**
 * Gets a list of `import`/`export` declaration targets.
 *
 * Core modules of Node.js (e.g. `fs`, `http`) are excluded.
 *
 * @param context - The rule context.
 * @param [options] - The flag to include core modules.
 * @param [options.includeCore] - The flag to include core modules.
 * @param [options.optionIndex] - The index of rule options.
 * @param callback - The callback function to get result.
 * @returns A list of found target's information.
 */
// eslint-disable-next-line import/no-default-export
export default function visitImport(
	context: Rule.RuleContext,
	{ includeCore = false, optionIndex = 0 } = {},
	callback: (targets: ImportTarget[]) => unknown,
): RuleListener {
	const targets: ImportTarget[] = []
	// eslint-disable-next-line sonarjs/deprecation, @typescript-eslint/no-deprecated
	const basedir = path.dirname(path.resolve(context.getFilename()))
	const paths = getResolvePaths(context as never, optionIndex)
	const options = {
		basedir,
		paths,

		// // ! hack: hardcode `~` and `_` path resolution
		// pathFilter: (
		// 	_pkg: unknown,
		// 	inputPath: string,
		// 	_relativePath: string,
		// ): string => {
		// 	console.log('pathFilter', inputPath, _relativePath)

		// 	if (inputPath.startsWith('~')) {
		// 		console.log('??', path.join('.', 'src', inputPath.slice(1)))
		// 		return path.join('src', inputPath.slice(1))
		// 	}

		// 	if (inputPath.startsWith('_'))
		// 		return path.join('src/_', inputPath.slice(1))

		// 	return inputPath
		// },
	}

	return {
		// @ts-expect-error ...
		// eslint-disable-next-line sonarjs/cyclomatic-complexity
		[[
			'ExportAllDeclaration',
			'ExportNamedDeclaration',
			'ImportDeclaration',
			'ImportExpression',
		]](node: {
			source: any
			type: string
			importKind: string
			exportKind: string
		}) {
			const sourceNode = node.source

			// skip `import(foo)`
			if (
				node.type === 'ImportExpression' &&
				sourceNode &&
				sourceNode.type !== 'Literal'
			) {
				return
			}

			// console.log('!!!', context.options)

			const name = sourceNode && stripImportPathParams(sourceNode.value)
			// Note: "999" arbitrary to check current/future Node.js version
			if (
				// eslint-disable-next-line sonarjs/expression-complexity
				name &&
				(context.options[1]?.includeTypeOnly ||
					(node.importKind !== 'type' && node.exportKind !== 'type')) &&
				(includeCore || !isCoreModule(name, '999'))
			) {
				// console.log('PUSH', name)
				targets.push(new ImportTarget(sourceNode, name, options))
			}
		},

		'Program:exit': function exit() {
			callback(targets)
		},
	}
}
