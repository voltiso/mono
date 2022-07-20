// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

declare const tag: unique symbol
export interface Tagged<Token> {
	readonly [tag]: Token
}

export type Opaque<X, name> = X & Tagged<name>
