import { IsProvided } from './IsProvided'

type Rec<Ts, True, False> = Ts extends []
	? True
	: Ts extends [infer Head, ...infer Tail]
	? IsProvided<Head> extends true
		? Rec<Tail, True, False>
		: False
	: never

export type AreProvided_<
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

export type AreProvided<
	Ts extends readonly unknown[],
	True = true,
	False = false
> = AreProvided_<Ts, True, False>
