// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ExternalButGood = {
	a: 1
} & { b: 2 }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ExternalInterface {}

/** @inline */
export type IncludesExternal = {
	ex: ExternalInterface | { a: 1 }
}

type SneakyPrivateThing = { a: 1 } & { b: 2 }

export type SneakyExternal = SneakyPrivateThing | { c: 0 }

export declare namespace Test {
	export type A = { a: 1 }
	export type B = { b: 1 }

	export namespace Nested {
		export type C<T = B> = { c: A | T; fun: <T = B>(x: T | A) => A }
	}
}

const AnyDoc = Symbol('AnyDoc')
export type AnyDoc = typeof AnyDoc

export const importedValue = Symbol('importedValue')

export const BothTypeAndValue = Symbol('BothTypeAndValue')
export type BothTypeAndValue = typeof BothTypeAndValue
