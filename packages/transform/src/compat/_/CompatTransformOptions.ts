// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type CompatTransformOptions = {
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
	}
}

export type CompatFeature = keyof CompatTransformOptions['supported']

export const defaultCompatTransformOptions: CompatTransformOptions = {
	supported: {
		numericSeparators: false, // useless in transpiled code
		undefined: false, // transpile to `void 0` by default
	},
}
