// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line tsdoc/syntax
/** @author Toru Nagashima See LICENSE file in root directory for full license. */

import type { Rule } from 'eslint'
import type { Node } from 'estree'
import isCoreModule from 'is-core-module'
import path from 'node:path'

import {
	getResolvePaths,
	getTryExtensions,
	ImportTarget,
} from '~/util.plugin-n'

import { stripImportPathParams } from './stripImportPathParams'

export type VisitImportOptions = {
	/** The flag to include core modules. */
	includeCore: boolean

	/** The index of rule options. */
	optionIndex: number
}

type MyNode = Node & {
	source?: MyNode
	// type: string
	value: string
}

/**
 * Gets a list of `import`/`export` declaration targets.
 *
 * Core modules of Node.js (e.g. `fs`, `http`) are excluded.
 *
 * @param context - The rule context.
 * @param options - `VisitImportOptions` object
 * @param callback - The callback function to get result.
 * @returns A list of found target's information.
 */
export function visitImport(
	context: Rule.RuleContext,
	visitImportOptions: Partial<VisitImportOptions>,
	// eslint-disable-next-line promise/prefer-await-to-callbacks
	callback: (targets: ImportTarget[]) => void,
): ImportTarget[] {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const { includeCore = false, optionIndex = 0 } = visitImportOptions || {}

	const targets: ImportTarget[] = []
	const basedir = path.dirname(path.resolve(context.getFilename()))
	const paths = getResolvePaths(context, optionIndex)
	const extensions = getTryExtensions(context, optionIndex)
	const options = { basedir, paths, extensions }

	return {
		// @ts-expect-error well...
		[[
			'ExportAllDeclaration',
			'ExportNamedDeclaration',
			'ImportDeclaration',
			'ImportExpression',
		]](node: MyNode) {
			const sourceNode = node.source

			// skip `import(foo)`
			if (
				node.type === 'ImportExpression' &&
				sourceNode &&
				sourceNode.type !== 'Literal'
			) {
				return
			}

			const name = sourceNode && stripImportPathParams(sourceNode.value)

			// Note: "999" arbitrary to check current/future Node.js version
			if (name && (includeCore || !isCoreModule(name, '999'))) {
				targets.push(new ImportTarget(sourceNode, name, options, 'import'))
			}
		},

		// @ts-expect-error well...
		'Program:exit': function () {
			// eslint-disable-next-line promise/prefer-await-to-callbacks
			callback(targets)
		},
	}
}
