// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '@voltiso/util'

import type { $$Schemable } from '~/Schemable'

import type { Rest } from '../Rest'
import type { MutableTuple, ReadonlyTuple } from '../Tuple'

export type FixTupleShape<
	Ts extends $$Schemable[] | [...$$Schemable[], Rest] | ($$Schemable | Rest)[],
> = FixTupleShape.Rec<[], [], Ts>

export namespace FixTupleShape {
	export type Rec<
		left extends unknown[],
		right extends unknown[],
		Ts,
	> = Ts extends []
		? [...left, ...right]
		: Ts extends [$$Schemable, ...infer Tss]
		? Rec<[...left, Ts[0]], right, Tss>
		: Ts extends [...infer Ts, $$Schemable]
		? Ts extends [...unknown[], infer R]
			? Rec<left, [R, ...right], []>
			: never
		: Ts extends Rest<infer R>[]
		? Rec<[...left, ...R[]], right, []>
		: never
}

//

export type GetTuple<
	This,
	T extends $$Schemable[] | [...$$Schemable[], Rest] | ($$Schemable | Rest)[],
> = This extends {
	[OPTIONS]: { isReadonlyTuple: boolean }
}
	? This[OPTIONS]['isReadonlyTuple'] extends true
		? ReadonlyTuple<FixTupleShape<T>>
		: This[OPTIONS]['isReadonlyTuple'] extends false
		? MutableTuple<FixTupleShape<T>>
		: never
	: never
