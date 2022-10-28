// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '_'
import type { _, IsCompatible, IsIdentical } from '@voltiso/util'

import type { $$Schemable, InferSchema_, SchemaOptions } from '~'

import type { $$Schema, CustomSchema, ISchema, SimpleSchema } from '.'

/** @inline */
export type CanBeSimpleSchema<
	S extends $$Schema & {
		OutputType: unknown
		InputType: unknown
		[OPTIONS]: SchemaOptions
	},
	True = true,
	False = false,
> = true extends S[OPTIONS]['isOptional']
	? False
	: true extends S[OPTIONS]['isReadonly']
	? False
	: false extends IsCompatible<S['OutputType'], S['InputType']>
	? False
	: True

/** @inline */
export type Simplify<S extends $$Schemable> = SimplifySchema<InferSchema_<S>>

/** @inline */
export type SimplifySchema<S extends $$Schema> = S extends 
	{
		OutputType: unknown
		InputType: unknown
		[OPTIONS]: SchemaOptions
	}

	? $$Schema extends S
		? S
		: ISchema<never> extends S
		? S
		: CanBeSimpleSchema<S> extends true
		? SimpleSchema<S['OutputType']>
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
							S['OutputType'],
							unknown,
							unknown,
							{ Output: S['OutputType'] }
						> &
						IsIdentical<
							S['InputType'],
							unknown,
							unknown,
							{ Input: S['InputType'] }
						>
				>
		  >
	: never
