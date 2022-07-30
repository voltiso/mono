// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface Constructor<
	Args extends unknown[] = any[],
	R extends object = object,
> {
	new (...args: Args): R
	prototype: R
}
