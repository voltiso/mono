// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

type _Reverse<
	Arr,
	AccumulatorL extends unknown[],
	AccumulatorR extends unknown[],
> = Arr extends []
	? [...AccumulatorL, ...AccumulatorR]
	: Arr extends [infer h, ...infer t]
	? _Reverse<t, AccumulatorL, [h, ...AccumulatorR]>
	: Arr extends [...infer t, infer h]
	? _Reverse<t, [...AccumulatorL, h], AccumulatorR>
	: Arr extends (infer t)[]
	? [...AccumulatorL, ...t[], ...AccumulatorR]
	: never

export type Reverse<Arr extends readonly unknown[]> = Arr extends unknown[]
	? _Reverse<Arr, [], []>
	: readonly [..._Reverse<[...Arr], [], []>]
