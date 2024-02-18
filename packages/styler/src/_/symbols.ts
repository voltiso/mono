// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//

export type STYLED_DATA = { readonly symbol: unique symbol }['symbol']
export const STYLED_DATA: STYLED_DATA = Symbol('STYLED_DATA') as never

//

export const STYLED_TYPE_INFO = Symbol('STYLED_TYPE_INFO')
export type STYLED_TYPE_INFO = typeof STYLED_TYPE_INFO

// export type STYLED_TYPE_INFO = { readonly symbol: unique symbol }['symbol']
// export declare const STYLED_TYPE_INFO: unique symbol
