// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable tsdoc/syntax */

/** @author Toru Nagashima See LICENSE file in root directory for full license. */

import * as path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import type { Node } from 'estree'
import * as resolve from 'resolve'

import { defaultResolve as importResolve } from '~/converted-esm/import-meta-resolve'

export type GetFilePathOptions = {
	paths?: readonly string[] | undefined
	basedir: string
}

/**
 * Resolve the given id to file paths.
 *
 * @param isModule - The flag which indicates this id is a module.
 * @param id - The id to resolve.
 * @param options - The options of node-resolve module. It requires
 *   `options.basedir`.
 * @param moduleType - Whether the target was require-ed or imported
 * @returns The resolved path.
 */
function getFilePath(
	isModule: boolean,
	id: string,
	options: GetFilePathOptions,
	moduleType: 'import' | 'require',
): string | null {
	if (moduleType === 'import') {
		const paths =
			options.paths && options.paths.length > 0
				? options.paths.map(p => path.resolve(process.cwd(), p))
				: [options.basedir]

		for (const aPath of paths) {
			try {
				const { url } = importResolve(id, {
					parentURL: pathToFileURL(path.join(aPath, 'dummy-file.mjs')).href,

					conditions: ['node', 'import', 'require'],
				})

				if (url) {
					return fileURLToPath(url)
				}
			} catch {
				continue
			}
		}

		if (isModule) {
			return null
		}

		return path.resolve(
			(options.paths && options.paths[0]) || options.basedir,
			id,
		)
	} else {
		try {
			return resolve.sync(id, options)
		} catch {
			try {
				const { url } = importResolve(id, {
					parentURL: pathToFileURL(path.join(options.basedir, 'dummy-file.js'))
						.href,

					conditions: ['node', 'require'],
				})

				return fileURLToPath(url)
			} catch {
				if (isModule) {
					return null
				}

				return path.resolve(options.basedir, id)
			}
		}
	}
}

/**
 * Gets the module name of a given path.
 *
 * E.g. `eslint/lib/ast-utils` -> `eslint`
 *
 * @param nameOrPath - A path to get.
 * @returns The module name of the path.
 */
function getModuleName(nameOrPath: string): string {
	let end = nameOrPath.indexOf('/')

	if (end !== -1 && nameOrPath[0] === '@') {
		end = nameOrPath.indexOf('/', 1 + end)
	}

	return end === -1 ? nameOrPath : nameOrPath.slice(0, end)
}

/** Information of an import target. */
export class ImportTarget {
	node: Node
	name: string
	filePath: string | null
	moduleName: string | null

	/**
	 * Initialize this instance.
	 *
	 * @param node - The node of a `require()` or a module declaration.
	 * @param name - The name of an import target.
	 * @param options - The options of `node-resolve` module.
	 * @param moduleType - Whether the target was require-ed or imported
	 */
	constructor(
		node: Node,
		name: string,
		options: GetFilePathOptions,
		moduleType: 'import' | 'require',
	) {
		const isModule = !/^(?:[./\\]|\w+:)/u.test(name)

		/** The node of a `require()` or a module declaration. */
		this.node = node

		/** The name of this import target. */
		this.name = name

		/**
		 * The full path of this import target. If the target is a module and it
		 * does not exist then this is `null`.
		 */
		this.filePath = getFilePath(isModule, name, options, moduleType)

		/**
		 * The module name of this import target. If the target is a relative path
		 * then this is `null`.
		 */
		this.moduleName = isModule ? getModuleName(name) : null
	}
}
