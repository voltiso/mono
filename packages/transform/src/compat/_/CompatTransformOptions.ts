// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface CompatTransformOptions {
	supported: {
		/**
		 * E.g. `1_000_000`
		 *
		 * @defaultValue `false`
		 */
		numericSeparators: boolean

		/**
		 * If `false` (not "supported") - transpile to `void 0`
		 *
		 * @defaultValue `false`
		 */
		undefined: boolean

		importDirectory: boolean // transpile to import `/index.js` instead
		importWithoutExtension: boolean // transpile to import `.js` instead
	}

	/** Unfortunately, ts-patch does not forward this to us */
	afterDeclarations?: boolean

	/**
	 * Hack: please supply `false` to fix import/export declarations in regular
	 * non-declaration files, and `true` for declaration files.
	 */
	afterDeclarationsHack?: boolean
}

export type CompatFeature = keyof CompatTransformOptions['supported']

export const defaultCompatTransformOptions: CompatTransformOptions = {
	supported: {
		numericSeparators: false, // useless in transpiled code
		undefined: false, // transpile to `void 0` by default
		importDirectory: false, // transpile to import `/index.js` instead
		importWithoutExtension: false, // transpile to import `.js` instead
	},
}
