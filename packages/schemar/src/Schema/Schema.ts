// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept, NotProvided, OptionalArgument } from '@voltiso/util'

import type { SchemaOptions } from '~'
import { SCHEMA_NAME } from '~'

import type { CustomSchema, ISchema } from '.'

export type Schema<
	O extends OptionalArgument<SchemaOptions | AlsoAccept<unknown>> = NotProvided,
> = O extends NotProvided
	? ISchema
	: O extends SchemaOptions
	? CustomSchema<O>
	: CustomSchema<{ Input: O; Output: O }>

export function isSchema(x: unknown): x is Schema {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as Schema | null)?.[SCHEMA_NAME])
}
