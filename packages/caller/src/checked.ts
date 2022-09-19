// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'

type PossiblyPromise<X> = X | Promise<X>

function isPromise<X>(x: X | Promise<X>): x is Promise<X> {
	// eslint-disable-next-line promise/prefer-await-to-then
	return Boolean(x) && typeof (x as Promise<unknown>).catch === 'function'
}

type G<
	Self extends t.SchemableLike | null = t.SchemableLike | null,
	Params extends readonly t.SchemableLike[] = readonly t.SchemableLike[],
	Result extends t.SchemableLike | null = t.SchemableLike | null,
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

	this<S extends t.SchemableLike>(
		schema: S,
	): Checked<G<S, T['params'], T['result']>> {
		if (this._self) throw new Error('already have `this` schema')

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked(schema, this._params, this._result) as any
	}

	param<S extends t.SchemableLike>(
		schema: S,
	): Checked<G<T['self'], [...T['params'], S], T['result']>> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked<
			G<T['self'], readonly [...T['params'], S], T['result']>
		>(this._self, [...this._params, schema], this._result) as any
	}

	result<S extends t.SchemableLike>(
		schema: S,
	): Checked<G<T['self'], T['params'], S>> {
		if (this._result) throw new Error('already have `result` schema')

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return new _Checked(this._self, this._params, schema) as any
	}

	function(
		f: (
			this: t.Type<T['self']>,
			...args: t.TupleType_<T['params']>
		) => PossiblyPromise<t.InputType<T['result']>>,
	) {
		const thisSchema = this._self ? s.schema(this._self) : null
		const argsSchema = s.schema(this._params)
		const resultSchema = this._result ? s.schema(this._result) : null

		return function (
			this: t.Type<T>,
			...args: t.TupleType_<T['params'], { kind: 'in' }>
		): PossiblyPromise<t.Type<T['result']>> {
			if (thisSchema) (thisSchema as t.Schema).validate(this) // throw on error

			const vArgs = (argsSchema as t.Schema).validate(args) // throw on error
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			const r = (f as any).call(this, ...(vArgs as unknown[]))
			function handler(r: t.InputType<T['result']>) {
				return (
					resultSchema ? (resultSchema as t.Schema).validate(r) : r
				) as never
			}

			// eslint-disable-next-line promise/prefer-await-to-then
			if (isPromise(r)) return r.then(handler)

			return handler(r as never)
		}
	}
}

export interface WithoutThis<T extends G> {
	function(
		f: (
			...args: t.TupleType_<T['params']>
		) => Promise<t.InputType<T['result']>>,
	): (
		...args: t.TupleType_<T['params'], { kind: 'in' }>
	) => Promise<t.Type<T['result']>>

	function(
		f: (...args: t.TupleType_<T['params']>) => t.InputType<T['result']>,
	): (...args: t.TupleType_<T['params'], { kind: 'in' }>) => t.Type<T['result']>

	function(
		f: (
			...args: t.TupleType_<T['params']>
		) => PossiblyPromise<t.InputType<T['result']>>,
	): (
		...args: t.TupleType_<T['params'], { kind: 'in' }>
	) => PossiblyPromise<t.Type<T['result']>>
}

export interface WithThis<T extends G> {
	function(
		f: (
			this: t.Type<T['self']>,
			...args: t.TupleType_<T['params']>
		) => t.InputType<T['result']>,
	): (
		this: t.Type<T['self']>,
		...args: t.TupleType_<T['params'], { kind: 'in' }>
	) => t.Type<T['result']>

	function(
		f: (
			this: t.Type<T['self']>,
			...args: t.TupleType_<T['params']>
		) => Promise<t.InputType<T['result']>>,
	): (
		this: t.Type<T['self']>,
		...args: t.TupleType_<T['params'], { kind: 'in' }>
	) => Promise<t.Type<T['result']>>

	function(
		f: (
			this: t.Type<T['self']>,
			...args: t.TupleType_<T['params']>
		) => PossiblyPromise<t.InputType<T['result']>>,
	): (
		this: t.Type<T['self']>,
		...args: t.TupleType_<T['params'], { kind: 'in' }>
	) => PossiblyPromise<t.Type<T['result']>>
}

type Checked<T extends G> = Pick<
	_Checked<T>,
	| 'param'
	| ([t.Void] extends [T['self']] ? 'this' : never)
	| ([t.Void] extends [T['result']] ? 'result' : never)
> &
	([t.Void] extends [T['self']] ? WithoutThis<T> : WithThis<T>)

export const checked = new _Checked(null, [], null) as unknown as Checked<
	G<t.Void, readonly [], t.Void>
>
