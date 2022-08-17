// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ExternalButGood = {
	a: 1
}

type SneakyPrivateThing = { a: 1 } & { b: 2 }

export type SneakyExternal = SneakyPrivateThing | { c: 0 }
