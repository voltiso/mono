// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Assume, OPTIONS } from '@voltiso/util'

import type {
	$$Schemable,
	MutableTuple$,
	ReadonlyTuple$,
	RelaxInferableTuple_,
} from '~'

// export type FixTupleShape_<Ts> = FixTupleShape.Rec<[], [], Ts>

// export type FixTupleShape<
// 	Ts extends $$Schemable[] | [...$$Schemable[], Rest] | ($$Schemable | Rest)[],
// > = FixTupleShape_<Ts>

// export declare namespace FixTupleShape {
// 	export type Rec<
// 		left extends unknown[],
// 		right extends unknown[],
// 		Ts,
// 	> = Ts extends []
// 		? [...left, ...right]
// 		: Ts extends [$$Schemable, ...infer Tss]
// 		? Rec<[...left, RelaxSchema_<Ts[0]>], right, Tss>
// 		: Ts extends [...infer Ts, $$Schemable]
// 		? Ts extends [...unknown[], infer R]
// 			? Rec<left, [RelaxSchema_<R>, ...right], []>
// 			: never
// 		: Ts extends Rest<infer R>[]
// 		? Rec<[...left, ...RelaxSchema_<R>[]], right, []>
// 		: never
// }

//

export type GetTuple$_<This, T> = This extends {
	[OPTIONS]: { isReadonlyTuple: boolean }
}
	? T extends any
		? This[OPTIONS]['isReadonlyTuple'] extends true
			? ReadonlyTuple$<Assume<$$Schemable[], RelaxInferableTuple_<T>>>
			: This[OPTIONS]['isReadonlyTuple'] extends false
				? MutableTuple$<Assume<$$Schemable[], RelaxInferableTuple_<T>>>
				: never
		: never
	: never

// export type GetTuple$<
// 	This,
// 	T extends $$Schemable[] | [...$$Schemable[], Rest] | ($$Schemable | Rest)[],
// > = GetTuple$_<This, T>
