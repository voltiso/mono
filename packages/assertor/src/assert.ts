// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schema,
	$$Schemable,
	CustomString,
	Instance,
	Literal,
	RegExpEntry,
	Schema,
	Type,
} from '@voltiso/schemar'
import { isSchema } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { CallInfo } from '@voltiso/transform'
import type { AlsoAccept, AtLeast1, Constructor, Falsy } from '@voltiso/util'
import { ProtoCallable } from '@voltiso/util'

import { Assertor } from './Assertor'

export interface AssertFunction {
	/**
	 * First overload - check if first argument is $$Schema
	 *
	 * @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument
	 */
	<S extends $$Schema>(
		schema: S,
		value: Type<S> | AlsoAccept<unknown>,
		__callInfo?: CallInfo | undefined,
	): asserts value is Type<S>

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	(
		value: unknown,
		message?: string,
		__callInfo?: CallInfo | undefined,
	): asserts value

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	(value: unknown, __callInfo?: CallInfo | undefined): asserts value

	//

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	schema<S extends $$Schemable>(
		schema: S,
		value: Type<S> | AlsoAccept<unknown>,
		__callInfo?: CallInfo | undefined,
	): asserts value is Type<S>

	/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
	not(value: unknown, __callInfo?: CallInfo | undefined): asserts value is Falsy

	//

	readonly defined: Assertor<typeof s.unknown, undefined | void>

	readonly string: Assertor<typeof s.string>
	regex(
		regExp: RegExp,
	): Assertor<CustomString<{ regExps: AtLeast1<RegExpEntry> }>>

	readonly number: Assertor<typeof s.number>
	readonly integer: Assertor<typeof s.integer>

	readonly bigint: Assertor<typeof s.bigint>

	readonly boolean: Assertor<typeof s.boolean>
	readonly true: Assertor<Literal<true>>
	readonly false: Assertor<Literal<false>>

	readonly object: Assertor<typeof s.object>
	readonly plainObject: Assertor<typeof s.plainObject>

	readonly symbol: Assertor<typeof s.symbol>

	readonly array: Assertor<typeof s.array>

	instance<C extends Constructor>(constructor: C): Assertor<Instance<C>>
}

const _getAssert: (name: string) => AssertFunction = name =>
	ProtoCallable({
		prototype: {
			schema(schema: $$Schemable, value: unknown, ...rest: any) {
				return new Assertor(`${name}.schema`, s.schema(schema), {
					argumentsPrefix: [schema],
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				})(value, ...rest)
			},

			get defined() {
				return new Assertor(
					`${name}.defined`,
					s.unknown.check(x => x !== undefined),
				) as never
			},

			get undefined() {
				return new Assertor(`${name}.undefined`, s.undefined) as never
			},

			get null() {
				return new Assertor(`${name}.undefined`, s.null) as never
			},

			get propertyKey() {
				return new Assertor(`${name}.safeKey`, s.propertyKey)
			},

			//

			get string() {
				return new Assertor(`${name}.string`, s.string)
			},

			regex(regExp: RegExp) {
				return new Assertor(`${name}.regex`, s.regex(regExp)) as never
			},

			//

			get number() {
				return new Assertor(`${name}.number`, s.number)
			},

			get array() {
				return new Assertor(`${name}.array`, s.array)
			},

			get integer() {
				return new Assertor(`${name}.integer`, s.integer)
			},

			//

			get bigint() {
				return new Assertor(`${name}.bigint`, s.bigint)
			},

			//

			get boolean() {
				return new Assertor(`${name}.boolean`, s.boolean)
			},

			get true() {
				return new Assertor(`${name}.true`, s.literal(true))
			},

			get false() {
				return new Assertor(`${name}.false`, s.literal(false))
			},

			get truthy() {
				return new Assertor(
					`${name}.true`,
					s.unknown.check(x => !!x),
				)
			},

			get falsy() {
				return new Assertor(
					`${name}.false`,
					s.unknown.check(x => !x),
				)
			},

			//

			get object() {
				return new Assertor(`${name}.object`, s.object)
			},

			get plainObject() {
				return new Assertor(`${name}.plainObject`, s.plainObject)
			},

			//

			get symbol() {
				return new Assertor(`${name}.symbol`, s.symbol)
			},

			//

			instance(constructor: Constructor) {
				return new Assertor(
					`${name}.instance`,
					s.instance(constructor),
				) as never
			},

			//

			/** @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument */
			not(value: unknown, __callInfo?: CallInfo | undefined) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const assertor = new Assertor(`${name}.not`, s.falsy) as any
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				assertor(value, __callInfo)
			},
		},

		call: (...args: any) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const [schema, value, ...rest]: [Schema, unknown, ...unknown[]] =
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				isSchema(args[0])
					? args
					: // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					  ([s.truthy, ...args] as never[])

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const assertor = new Assertor(name, schema, {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				argumentsPrefix: isSchema(args[0]) ? [args[0]] : [],
			}) as any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			assertor(value, ...rest)
		},
	})

/**
 * Assertor
 *
 * @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument
 */
export const assert: AssertFunction = _getAssert('assert')

/**
 * @callInfo 🖨️ Use `@voltiso/transform/call-info` to append call information as the last argument
 * @strip 👗 Use `@voltiso/transform/strip` to strip from production code
 */
export const $assert: AssertFunction = _getAssert('$assert')

//

function _getProxy(): never {
	return new Proxy(_getProxy, {
		get() {
			return _getProxy()
		},
	}) as never
}

/**
 * Does not actually do any assertions, but still acts as a type-guard
 *
 * @strip 👗 Use `@voltiso/transform/strip` to strip from production code
 */
export const $Assume: AssertFunction = _getProxy()
