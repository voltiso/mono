export function final<This extends Base, Base extends object>(
	thisArg: This,
	Base: { prototype: Base },
	...methods: (string & keyof Base)[]
) {
	for (const m of methods) {
		if (thisArg[m] !== Base.prototype[m]) throw new Error(`method ${m} is final (cannot override)`)
	}
}
