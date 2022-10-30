// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Call1, TypeAlias1 } from '~'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Array {
	export type Map<
		arr extends readonly unknown[],
		operation extends TypeAlias1,
	> = Map._Rec<arr, operation, []>

	// eslint-disable-next-line @typescript-eslint/no-namespace
	export namespace Map {
		export type _Rec<
			arr,
			operation extends TypeAlias1,
			acc extends unknown[],
		> = arr extends readonly []
			? acc
			: arr extends readonly [infer head, ...infer tail]
			? _Rec<tail, operation, [...acc, Call1<operation, head>]>
			: never
	}
}
