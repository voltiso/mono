// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type IS_DOC_CONSTRUCTOR = { readonly symbol: unique symbol }['symbol']

export const IS_DOC_CONSTRUCTOR: IS_DOC_CONSTRUCTOR = Symbol(
	'IS_DOC_CONSTRUCTOR',
) as never

//

export interface $$DocConstructor {
	readonly [IS_DOC_CONSTRUCTOR]: true
}
