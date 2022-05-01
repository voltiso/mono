type MethodKey<O> = string &
	{
		[k in keyof O]: O[k] extends (this: O, ...args: never[]) => unknown ? k : never
	}[keyof O]

export function final<This extends Base, Base extends object>(
	thisArg: This,
	Base: { prototype: Base },
	...methods: MethodKey<Base>[]
) {
	for (const m of methods) {
		if (thisArg[m] !== Base.prototype[m]) throw new Error(`method ${m} is final (cannot override)`)
	}
}
