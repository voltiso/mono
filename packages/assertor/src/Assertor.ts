// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'
import { isValidationError } from '@voltiso/schemar'
import type { CallInfo } from '@voltiso/transform'
import type { AlsoAccept } from '@voltiso/util'
import { assert, BoundCallable, CALL } from '@voltiso/util'

import { AssertorError } from './AssertorError'

export interface AssertorOptions {
	argumentsPrefix?: unknown[]
}

/** @internal */
export class _Assertor {
	private readonly _name: string
	private readonly _schema: s.ISchema
	private readonly _options: AssertorOptions | undefined

	constructor(name: string, schema: s.ISchema, options?: AssertorOptions) {
		this._name = name
		this._schema = schema
		this._options = options

		// eslint-disable-next-line no-constructor-return
		return new Proxy(BoundCallable(this), {
			get: (target, property, receiver) => {
				if (property in target)
					return Reflect.get(target, property, receiver) as never
				else {
					assert(this._schema)
					// eslint-disable-next-line etc/no-internal
					return new _Assertor(
						`${this._name}.${property.toString()}`,
						this._schema[property as never],
					) as never
				}
			},
		})
	}

	/**
	 * @throws On assertion failure
	 * @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument
	 */
	[CALL](
		value: unknown,
		...rest: [string, CallInfo | undefined] | [CallInfo | undefined]
	): any {
		const [message, callInfo] =
			rest.length >= 2
				? rest
				: typeof rest[0] === 'string'
				? [rest[0], undefined]
				: [undefined, rest[0]]

		try {
			this._schema.assertValid(value)
		} catch (error) {
			if (!isValidationError(error)) throw error

			throw new AssertorError({
				name: this._name,
				message: message as string,
				arguments: [...(this._options?.argumentsPrefix || []), value],
				callInfo,
				cause: error,
			})
		}
	}
}

/** @internal */
export type _AssertorMapped<S extends Partial<s.Schema>, Exclude> = {
	[k in keyof S]: S[k] extends (...args: infer Args) => infer R
		? R extends s.$$Schema
			? (...args: Args) => Assertor<R, Exclude>
			: never
		: S[k] extends s.$$Schema
		? Assertor<S[k], Exclude>
		: never
}

export type Assertor<S extends s.$$Schema, Exclude = never> = {
	//

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	<Value extends s.Type<S> | AlsoAccept<unknown>>(
		value: Value,
		__callInfo?: CallInfo,
	): asserts value is Value extends Exclude ? never : Value & s.Type<S>

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	<Value extends s.Type<S> | AlsoAccept<unknown>>(
		value: Value,
		message: string,
		__callInfo?: CallInfo,
	): asserts value is Value extends Exclude ? never : Value & s.Type<S>

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
		| s.SCHEMA_NAME /* | 'or' */
	>,
	Exclude
>

// eslint-disable-next-line etc/no-internal
export const Assertor = _Assertor as unknown as AssertorConstructor

export type AssertorConstructor = new <S extends s.Schema>(
	name: string,
	schema: S,
	options?: AssertorOptions | undefined,
) => Assertor<S>
