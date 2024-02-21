// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
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

import type { AssertorOptions } from './Assertor'
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

	readonly undefined: Assertor<typeof s.undefined>
	readonly null: Assertor<typeof s.null>
	readonly nullish: Assertor<typeof s.nullish>

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

const cache = new Map<string, Assertor<$$Schema>>()

/** Cache by name */
function _getAssertor<TSchema extends Schema, Options extends AssertorOptions>(
	name: string,
	schema: TSchema,
	options?: Options,
) {
	if (!cache.has(name)) {
		cache.set(name, new Assertor(name, schema, options))
	}

	return cache.get(name) as Assertor<TSchema>
}

const _getAssert: (name: string) => AssertFunction = name =>
	ProtoCallable({
		prototype: {
			schema(schema: $$Schemable, value: unknown, ...rest: any) {
				// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
				return new Assertor(`${name}.schema`, s.schema(schema), {
					argumentsPrefix: [schema],
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				})(value, ...rest)
			},

			get undefined() {
				return _getAssertor(`${name}.undefined`, s.undefined) as never
			},

			get null() {
				return _getAssertor(`${name}.null`, s.null) as never
			},

			get nullish() {
				return _getAssertor(`${name}.nullish`, s.nullish) as never
			},

			get defined() {
				return _getAssertor(
					`${name}.defined`,
					s.unknown.check(x => x !== undefined),
				) as never
			},

			get propertyKey() {
				return _getAssertor(`${name}.propertyKey`, s.propertyKey)
			},

			//

			get string() {
				return _getAssertor(`${name}.string`, s.string)
			},

			regex(regExp: RegExp) {
				return _getAssertor(`${name}.regex`, s.regex(regExp)) as never
			},

			//

			get number() {
				return _getAssertor(`${name}.number`, s.number)
			},

			get array() {
				return _getAssertor(`${name}.array`, s.array)
			},

			get integer() {
				return _getAssertor(`${name}.integer`, s.integer)
			},

			//

			get bigint() {
				return _getAssertor(`${name}.bigint`, s.bigint)
			},

			//

			get boolean() {
				return _getAssertor(`${name}.boolean`, s.boolean)
			},

			get true() {
				return _getAssertor(`${name}.true`, s.literal(true))
			},

			get false() {
				return _getAssertor(`${name}.false`, s.literal(false))
			},

			get truthy() {
				return _getAssertor(
					`${name}.true`,
					s.unknown.check(x => !!x),
				)
			},

			get falsy() {
				return _getAssertor(
					`${name}.false`,
					s.unknown.check(x => !x),
				)
			},

			//

			get object() {
				return _getAssertor(`${name}.object`, s.object)
			},

			get plainObject() {
				return _getAssertor(`${name}.plainObject`, s.plainObject)
			},

			//

			get symbol() {
				return _getAssertor(`${name}.symbol`, s.symbol)
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
				const assertor = _getAssertor(`${name}.not`, s.falsy) as any
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				assertor(value, __callInfo)
			},
		},

		call: (...args: readonly unknown[]) => {
			if (args.length === 1 && !isSchema(args[0])) {
				const assertor = _getAssertor(name, s.truthy)
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				;(assertor as any)(args[0])
			}

			const [schema, value, ...rest]: readonly [Schema, unknown, ...unknown[]] =
				isSchema(args[0]) ? (args as never) : ([s.truthy, ...args] as never)

			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const assertor = new Assertor(name, schema, {
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
