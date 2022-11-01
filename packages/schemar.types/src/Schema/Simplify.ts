// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, IsCompatible, IsIdentical, OPTIONS } from '@voltiso/util'

import type { $$Schemable, InferSchema_, SchemaOptions } from '~'

import type { $$Schema, CustomSchema, ISchema, SimpleSchema } from '.'

/** @inline */
export type CanBeSimpleSchema<
	S extends $$Schema & {
		Output: unknown
		Input: unknown
		[OPTIONS]: SchemaOptions
	},
	True = true,
	False = false,
> = true extends S[OPTIONS]['isOptional']
	? False
	: true extends S[OPTIONS]['isReadonly']
	? False
	: false extends IsCompatible<S['Output'], S['Input']>
	? False
	: True

/** @inline */
export type Simplify<S extends $$Schemable> = SimplifySchema<InferSchema_<S>>

/** @inline */
export type SimplifySchema<S extends $$Schema> = S extends {
	Output: unknown
	Input: unknown
	[OPTIONS]: SchemaOptions
}
	? $$Schema extends S
		? S
		: ISchema<never> extends S
		? S
		: CanBeSimpleSchema<S> extends true
		? SimpleSchema<S['Output']>
		: CustomSchema<
				_<
					(S[OPTIONS]['isOptional'] extends false
						? {}
						: { isOptional: S[OPTIONS]['isOptional'] }) &
						(S[OPTIONS]['isReadonly'] extends false
							? {}
							: { isReadonly: S[OPTIONS]['isReadonly'] }) &
						(S[OPTIONS]['hasDefault'] extends false
							? {}
							: { hasDefault: S[OPTIONS]['hasDefault'] }) &
						IsIdentical<
							S['Output'],
							unknown,
							unknown,
							{ Output: S['Output'] }
						> &
						IsIdentical<S['Input'], unknown, unknown, { Input: S['Input'] }>
				>
		  >
	: never
