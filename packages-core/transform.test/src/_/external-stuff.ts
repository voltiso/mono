// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
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
}
