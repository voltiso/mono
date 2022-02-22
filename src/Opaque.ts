declare const tag: unique symbol
export type Tagged<Token> = {
	readonly [tag]: Token
}

export type Opaque<X, name> = X & Tagged<name>
