import { IsProvided } from './IsProvided'

type Rec<Ts, True, False> = Ts extends []
	? True
	: Ts extends [infer Head, ...infer Tail]
	? IsProvided<Head> extends false
		? Rec<Tail, True, False>
		: False
	: never

export type AreNotProvided_<
	Ts,
	True = true,
	False = false
> = Ts extends readonly unknown[]
	? Rec<
			[...Ts], // get rid of readonly
			True,
			False
	  >
	: never

export type AreNotProvided<
	Ts extends readonly unknown[],
	True = true,
	False = false
> = AreNotProvided_<Ts, True, False>
