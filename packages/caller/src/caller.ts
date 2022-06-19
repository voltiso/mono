/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

type PossiblyPromise<X> = X | Promise<X>

const isPromise = <X>(x: X | Promise<X>): x is Promise<X> =>
	!!x && typeof (x as Promise<unknown>).catch === 'function'

type G<
	T extends RawSchema | null = RawSchema | null,
	P extends readonly RawSchema[] = readonly RawSchema[],
	R extends RawSchema | null = RawSchema | null
> = {
	t: T
	p: P
	r: R
}

class _Checked<T extends G> {
	_self: T['t']
	_params: T['p']
	_result: T['r']

	constructor(self: T['t'], params: T['p'], result: T['r']) {
		this._self = self
		this._params = params
		this._result = result
	}

	this<S extends RawSchema>(schema: S): Checked<G<S, T['p'], T['r']>> {
		if (this._self) throw new Error('already have `this` schema')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked(schema, this._params, this._result) as any
	}

	param<S extends RawSchema>(
		schema: S
	): Checked<G<T['t'], [...T['p'], S], T['r']>> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked<G<T['t'], readonly [...T['p'], S], T['r']>>(
			this._self,
			[...this._params, schema],
			this._result
		) as any
	}

	result<S extends RawSchema>(schema: S): Checked<G<T['t'], T['p'], S>> {
		if (this._result) throw new Error('already have `result` schema')
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked(this._self, this._params, schema) as any
	}

	function(
		f: (
			this: Infer<T>,
			...args: Infer<T['p']>
		) => PossiblyPromise<InferInput<T['r']>>
	) {
		const zodThisSchema = this._self ? rawToZod(this._self) : null
		const zodArgsSchema = rawToZod(this._params)
		const zodResultSchema = this._result ? rawToZod(this._result) : null
		return function (
			this: Infer<T>,
			...args: InferInput<T['p']>
		): PossiblyPromise<Infer<T['r']>> {
			if (zodThisSchema) zodThisSchema.parse(this) // no modifications
			const vArgs = zodArgsSchema.parse(args)
			const r = (f as any).call(this, ...vArgs)
			const cb = (r: InferInput<T['r']>) =>
				(zodResultSchema ? zodResultSchema.parse(r) : r) as Infer<T['r']>
			if (isPromise(r)) return r.then(cb)
			else return cb(r)
		}
	}
}

interface WithoutThis<T extends G> {
	function(
		f: (...args: Infer<T['p']>) => InferInput<T['r']>
	): (...args: InferInput<T['p']>) => Infer<T['r']>

	function(
		f: (...args: Infer<T['p']>) => Promise<InferInput<T['r']>>
	): (...args: InferInput<T['p']>) => Promise<Infer<T['r']>>

	function(
		f: (...args: Infer<T['p']>) => PossiblyPromise<InferInput<T['r']>>
	): (...args: InferInput<T['p']>) => PossiblyPromise<Infer<T['r']>>
}

interface WithThis<T extends G> {
	function(
		f: (this: Infer<T['t']>, ...args: Infer<T['p']>) => InferInput<T['r']>
	): (this: Infer<T['t']>, ...args: InferInput<T['p']>) => Infer<T['r']>

	function(
		f: (
			this: Infer<T['t']>,
			...args: Infer<T['p']>
		) => Promise<InferInput<T['r']>>
	): (
		this: Infer<T['t']>,
		...args: InferInput<T['p']>
	) => Promise<Infer<T['r']>>

	function(
		f: (
			this: Infer<T['t']>,
			...args: Infer<T['p']>
		) => PossiblyPromise<InferInput<T['r']>>
	): (
		this: Infer<T['t']>,
		...args: InferInput<T['p']>
	) => PossiblyPromise<Infer<T['r']>>
}

type Checked<T extends G> = Pick<
	_Checked<T>,
	| 'param'
	| ([ZodVoid] extends [T['t']] ? 'this' : never)
	| ([ZodNever] extends [T['r']] ? 'result' : never)
> &
	([ZodUnknown] extends [T['t']] ? WithoutThis<T> : WithThis<T>)

export const checked = new _Checked(null, [], null) as unknown as Checked<
	G<ZodVoid, readonly [], ZodNever | ZodType<Promise<void>>>
>
