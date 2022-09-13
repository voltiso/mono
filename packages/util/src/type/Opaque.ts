// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export declare const TAG: unique symbol
export type TAG = typeof TAG

export interface Tagged<Token> {
	readonly [TAG]: Token
}

export type Opaque<X, name> = X & Tagged<name>
