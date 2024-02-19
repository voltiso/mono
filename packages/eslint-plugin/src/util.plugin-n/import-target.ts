// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/require-hyphen-before-param-description */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck ...

/* eslint-disable jsdoc/informative-docs */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable tsdoc/syntax */

import path from 'node:path'

import resolve from 'resolve'

/**
 * Resolve the given id to file paths.
 *
 * @param isModule The flag which indicates this id is a module.
 * @param id The id to resolve.
 * @param options The options of node-resolve module. It requires
 *   `options.basedir`.
 * @returns The resolved path.
 */
function getFilePath(isModule, id, options) {
	// console.log('getFilePath', isModule, id, options)

	if (id.startsWith('~')) {
		const idx = options.basedir.indexOf('/src')
		if(idx !== -1) {
			const packageDir = `${options.basedir.slice(0, idx)}/src`
			const relativePath = path.relative(options.basedir, packageDir)
			// eslint-disable-next-line no-param-reassign
			id = path.join(relativePath, id.slice(1))
		}
	} else if (id.startsWith('_')) {
		const idx = options.basedir.indexOf('/src')
		if (idx !== -1) {
			const packageDir = `${options.basedir.slice(0, idx)}/src/_`
			const relativePath = path.relative(options.basedir, packageDir)
			// eslint-disable-next-line no-param-reassign
			id = path.join(relativePath, id.slice(1))
		}
	}

	if (isModule) {
		return null
	}
	try {
		return resolve.sync(id, options)
	} catch {
		return path.resolve(options.basedir, id)
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
function getModuleName(nameOrPath) {
	let end = nameOrPath.indexOf('/')
	if (end !== -1 && nameOrPath[0] === '@') {
		end = nameOrPath.indexOf('/', 1 + end)
	}

	return end === -1 ? nameOrPath : nameOrPath.slice(0, end)
}

/** Information of an import target. */
export default class ImportTarget {
	/**
	 * Initialize this instance.
	 *
	 * @param node - The node of a `require()` or a module declaration.
	 * @param name - The name of an import target.
	 * @param options - The options of `node-resolve` module.
	 */
	constructor(node, name, options) {
		const isModule = !/^(?:[./\\_~]|\w+:)/u.test(name) // ! added `_~` to treat imports beginning with these as local
		// const isModule = !/^(?:[./\\]|\w+:)/u.test(name)

		/**
		 * The node of a `require()` or a module declaration.
		 *
		 * @type {ASTNode}
		 */
		this.node = node

		/**
		 * The name of this import target.
		 *
		 * @type {string}
		 */
		this.name = name

		/**
		 * The full path of this import target. If the target is a module and it
		 * does not exist then this is `null`.
		 *
		 * @type {string | null}
		 */
		this.filePath = getFilePath(isModule, name, options)

		// console.log('filePath', this.filePath)

		/**
		 * The module name of this import target. If the target is a relative path
		 * then this is `null`.
		 *
		 * @type {string | null}
		 */
		this.moduleName = isModule ? getModuleName(name) : null
	}
}
