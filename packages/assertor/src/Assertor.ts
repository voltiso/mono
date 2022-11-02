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

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	[CALL](
		value: t.Type<S> | AlsoAccept<unknown>,
		...rest: [string, CallInfo | undefined] | [CallInfo | undefined]
	): asserts value is t.Type<S> {
		const [message, callInfo] =
			rest.length >= 2
				? rest
				: typeof rest[0] === 'string'
				? [rest[0], undefined]
				: [undefined, rest[0]]

		try {
			this._schema.validate(value, { fix: false })
		} catch (error) {
			if (!isValidationError(error)) throw error

			throw new AssertorError({
				name: this._name,
				message: message as string,
				arguments: [value],
				callInfo,
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
	//

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	<Value extends t.Type<S> | AlsoAccept<unknown>>(
		value: Value,
		__callInfo?: CallInfo,
	): asserts value is Value extends Exclude ? never : Value & t.Type<S>

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	<Value extends t.Type<S> | AlsoAccept<unknown>>(
		value: Value,
		message: string,
		__callInfo?: CallInfo,
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
