// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept, NotProvided, OptionalArgument } from '@voltiso/util'

import type { SchemaOptions } from '~'

import type { CustomSchema, ISchema } from '.'

export type Schema<
	O extends OptionalArgument<SchemaOptions | AlsoAccept<unknown>> = NotProvided,
> = [O] extends [never]
	? ISchema<never>
	: [O] extends [NotProvided]
	? ISchema
	: [O] extends [SchemaOptions]
	? CustomSchema<O>
	: // : s.ISchema<O>
	  SimpleSchema<O>
// CustomSchema<{
// 	Output: O
// 	Input: O
// }>

export interface SimpleSchema<T>
	extends CustomSchema<{ Output: T; Input: T }> {}
