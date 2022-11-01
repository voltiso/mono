// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isValidationError } from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import type { CallInfo } from '@voltiso/transform'
import type { AlsoAccept } from '@voltiso/util'
import { BoundCallable, CALL } from '@voltiso/util'

import { AssertorError } from './AssertorError'

/** @internal */
export class _Assertor<S extends t.Schema> {
	private readonly _name: string
	private readonly _schema: S

	constructor(name: string, schema: S) {
		this._name = name
		this._schema = schema

		// eslint-disable-next-line no-constructor-return
		return new Proxy(BoundCallable(this), {
			get: (target, property, receiver) => {
				if (property in target)
					return Reflect.get(target, property, receiver) as never
				else {
					// eslint-disable-next-line etc/no-internal
					return new _Assertor(
						`${name}.${property.toString()}`,
						schema[property as never],
					) as never
				}
			},
		})
	}

	/**
	 * @callInfo ➕ Use `{@link @voltiso/transform/call-info}` to automatically add
	 * `__callInfo` argument when transpiling
	 */
	[CALL](
		value: t.Type<S> | AlsoAccept<unknown>,
		__callInfo?: CallInfo,
	): asserts value is t.Type<S> {
		try {
			this._schema.validate(value, { fix: false })
		} catch (error) {
			if (!isValidationError(error)) throw error

			throw new AssertorError({
				name: this._name,
				value,
				callInfo: __callInfo,
				cause: error,
			})
		}
	}
}

/** @internal */
export type _AssertorMapped<S extends Partial<t.Schema>, Exclude> = {
	[k in keyof S]: S[k] extends (...args: infer Args) => infer R
		? R extends t.$$Schema
			? (...args: Args) => Assertor<R, Exclude>
			: never
		: S[k] extends t.$$Schema
		? Assertor<S[k], Exclude>
		: never
}

export type Assertor<S extends t.$$Schema, Exclude = never> = {
	<Value extends t.Type<S> | AlsoAccept<unknown>>(
		value: Value,
	): asserts value is Value extends Exclude ? never : Value & t.Type<S>

	//

	// or<Other extends t.$$Schemable>(other: Other): Assertor<t.Union<[S, Other]>, Exclude>

	// eslint-disable-next-line etc/no-internal
} & _AssertorMapped<
	Omit<
		S,
		| 'optional'
		| 'isOptional'
		| 'readonly'
		| 'isReadonly'
		| t.SCHEMA_NAME /* | 'or' */
	>,
	Exclude
>

// eslint-disable-next-line etc/no-internal
export const Assertor = _Assertor as unknown as AssertorConstructor

export type AssertorConstructor = new <S extends t.Schema>(
	name: string,
	schema: S,
) => Assertor<S>
