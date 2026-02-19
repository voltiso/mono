// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsSet } from './is-set'

type Rec<Ts, True, False> = Ts extends []
	? True
	: Ts extends [infer Head, ...infer Tail]
		? IsSet<Head> extends false
			? Rec<Tail, True, False>
			: False
		: never

export type AreAllUnset_<
	Ts,
	True = true,
	False = false,
> = Ts extends readonly unknown[]
	? Rec<
			[...Ts], // get rid of readonly
			True,
			False
		>
	: never

export type AreAllUnset<
	Ts extends readonly unknown[],
	True = true,
	False = false,
> = AreAllUnset_<Ts, True, False>
