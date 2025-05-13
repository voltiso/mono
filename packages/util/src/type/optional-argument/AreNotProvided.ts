// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsProvided } from './IsProvided'

type Rec<Ts, True, False> = Ts extends []
	? True
	: Ts extends [infer Head, ...infer Tail]
		? IsProvided<Head> extends false
			? Rec<Tail, True, False>
			: False
		: never

export type AreNoArgument_<
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

export type AreNoArgument<
	Ts extends readonly unknown[],
	True = true,
	False = false,
> = AreNoArgument_<Ts, True, False>
