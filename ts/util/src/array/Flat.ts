// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Flat<arrays> = Flat._Rec<arrays, []>

export namespace Flat {
	/** @internal */
	export type _Rec<
		arrays,
		acc extends readonly unknown[],
	> = arrays extends readonly []
		? acc
		: arrays extends readonly [readonly [infer a, ...infer as], ...infer tail]
			? _Rec<[a, ...as, ...tail], acc>
			: arrays extends [infer head, ...infer tail]
				? _Rec<tail, [...acc, head]>
				: never
}
