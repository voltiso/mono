type _Reverse<Arr, AccL extends unknown[], AccR extends unknown[]> = Arr extends []
	? [...AccL, ...AccR]
	: Arr extends [infer h, ...infer t]
	? _Reverse<t, AccL, [h, ...AccR]>
	: Arr extends [...infer t, infer h]
	? _Reverse<t, [...AccL, h], AccR>
	: Arr extends (infer t)[]
	? [...AccL, ...t[], ...AccR]
	: never

export type Reverse<Arr extends unknown[]> = _Reverse<Arr, [], []>
