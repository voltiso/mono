// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface AtomicStyle {
	property: string

	/** Must include `&` */
	selectors: string[]

	/** Can have different values for different media queries */
	overrides: AtomicStyle.Override[]
}

export namespace AtomicStyle {
	export interface Override {
		/**
		 * Nested media queries
		 *
		 * Can be empty
		 *
		 * E.g. `['@media(prefers-color-scheme:dark)', '@media(min-width:600px)']`
		 */
		mediaQueries: string[]

		/**
		 * A single or multiple property values to output to CSS
		 *
		 * E.g. `['--var(fg)', 'red']`
		 */
		values: (string | number)[]
	}
}
