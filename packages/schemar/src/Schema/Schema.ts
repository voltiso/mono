// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept, NotProvided, OptionalArgument } from '@voltiso/util'

import type * as s from '~'

import type { CustomSchema, ISchema } from '.'

export type Schema<
	O extends OptionalArgument<
		s.SchemaOptions | AlsoAccept<unknown>
	> = NotProvided,
> = [O] extends [never]
	? s.ISchema<never>
	: [O] extends [NotProvided]
	? ISchema
	: [O] extends [s.SchemaOptions]
	? CustomSchema<O>
	: s.ISchema<O>
