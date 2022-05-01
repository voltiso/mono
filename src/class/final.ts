type MethodKey<O> = string &
	{
		[k in keyof O]: O[k] extends (this: O, ...args: never[]) => unknown ? k : never
	}[keyof O]

export function final<Base>(
	thisArg: Record<MethodKey<Base>, unknown>,
	Base: {
		prototype: Base
		name: string
	},
	...methods: MethodKey<Base>[]
) {
	for (const m of methods) {
		if (typeof Base.prototype[m] !== 'function') throw new Error(`${m} is not a method in ${Base.name}`)
		if (thisArg[m] !== Base.prototype[m]) throw new Error(`method ${m} is final (cannot override)`)
	}
}
