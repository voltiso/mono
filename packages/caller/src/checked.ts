// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetInputType, GetType, Schemable } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'

type PossiblyPromise<X> = X | Promise<X>

function isPromise<X>(x: X | Promise<X>): x is Promise<X> {
	// eslint-disable-next-line promise/prefer-await-to-then
	return Boolean(x) && typeof (x as Promise<unknown>).catch === 'function'
}

type G<
	Self extends Schemable | null = Schemable | null,
	Params extends readonly Schemable[] = readonly Schemable[],
	Result extends Schemable | null = Schemable | null,
> = {
	self: Self
	params: Params
	result: Result
}

class _Checked<T extends G> {
	_self: T['self']
	_params: T['params']
	_result: T['result']

	constructor(self: T['self'], params: T['params'], result: T['result']) {
		this._self = self
		this._params = params
		this._result = result
	}

	this<S extends Schemable>(
		schema: S,
	): Checked<G<S, T['params'], T['result']>> {
		if (this._self) throw new Error('already have `this` schema')

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked(schema, this._params, this._result) as any
	}

	param<S extends Schemable>(
		schema: S,
	): Checked<G<T['self'], [...T['params'], S], T['result']>> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked<
			G<T['self'], readonly [...T['params'], S], T['result']>
		>(this._self, [...this._params, schema], this._result) as any
	}

	result<S extends Schemable>(
		schema: S,
	): Checked<G<T['self'], T['params'], S>> {
		if (this._result) throw new Error('already have `result` schema')

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked(this._self, this._params, schema) as any
	}

	function(
		f: (
			this: GetType<T['self']>,
			...args: GetType<T['params']>
		) => PossiblyPromise<GetInputType<T['result']>>,
	) {
		const thisSchema = this._self ? s.schema(this._self) : null
		const argsSchema = s.schema(this._params)
		const resultSchema = this._result ? s.schema(this._result) : null

		return function (
			this: GetType<T>,
			...args: GetInputType<T['params']>
		): PossiblyPromise<GetType<T['result']>> {
			if (thisSchema) thisSchema.validate(this) // throw on error

			const vArgs = argsSchema.validate(args) // throw on error
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			const r = (f as any).call(this, ...vArgs)
			const handler = (r: GetInputType<T['result']>) =>
				(resultSchema ? resultSchema.validate(r) : r) as GetType<T['result']>

			// eslint-disable-next-line promise/prefer-await-to-then
			if (isPromise(r)) return r.then(handler)

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			return handler(r)
		}
	}
}

interface WithoutThis<T extends G> {
	function(
		f: (...args: GetType<T['params']>) => GetInputType<T['result']>,
	): (...args: GetInputType<T['params']>) => GetType<T['result']>

	function(
		f: (...args: GetType<T['params']>) => Promise<GetInputType<T['result']>>,
	): (...args: GetInputType<T['params']>) => Promise<GetType<T['result']>>

	function(
		f: (
			...args: GetType<T['params']>
		) => PossiblyPromise<GetInputType<T['result']>>,
	): (
		...args: GetInputType<T['params']>
	) => PossiblyPromise<GetType<T['result']>>
}

interface WithThis<T extends G> {
	function(
		f: (
			this: GetType<T['self']>,
			...args: GetType<T['params']>
		) => GetInputType<T['result']>,
	): (
		this: GetType<T['self']>,
		...args: GetInputType<T['params']>
	) => GetType<T['result']>

	function(
		f: (
			this: GetType<T['self']>,
			...args: GetType<T['params']>
		) => Promise<GetInputType<T['result']>>,
	): (
		this: GetType<T['self']>,
		...args: GetInputType<T['params']>
	) => Promise<GetType<T['result']>>

	function(
		f: (
			this: GetType<T['self']>,
			...args: GetType<T['params']>
		) => PossiblyPromise<GetInputType<T['result']>>,
	): (
		this: GetType<T['self']>,
		...args: GetInputType<T['params']>
	) => PossiblyPromise<GetType<T['result']>>
}

type Checked<T extends G> = Pick<
	_Checked<T>,
	| 'param'
	| ([s.Void] extends [T['self']] ? 'this' : never)
	| ([s.Never] extends [T['result']] ? 'result' : never)
> &
	([s.Void] extends [T['self']] ? WithoutThis<T> : WithThis<T>)

export const checked = new _Checked(null, [], null) as unknown as Checked<
	G<s.Void, readonly [], s.Never | s.Schema<Promise<void>>>
>
