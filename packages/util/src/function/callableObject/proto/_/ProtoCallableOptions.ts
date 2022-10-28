// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ProtoCallableOptions = {
	/** Call implementation */
	call(this: void, ...args: unknown[]): unknown

	/** `prototype` to use to inherit resulting object fields */
	prototype: object | null
}
