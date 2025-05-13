// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type PickIndexSignatures<T> = {
	[k in keyof T as string extends k
		? k
		: number extends k
			? k
			: symbol extends k
				? k
				: never]: T[k]
}
