// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NotProvided, OptionalArgument } from '@voltiso/util'

import type { CustomSchema, ISchema } from '.'

export type Schema<T extends OptionalArgument<unknown> = NotProvided> = [
	T,
] extends [never]
	? SimpleSchema<never>
	: T extends NotProvided
	? ISchema
	: SimpleSchema<T>

export type $Schema<T extends OptionalArgument<unknown> = NotProvided> =
	T extends any ? Schema<T> : never

export interface SimpleSchema<T>
	extends CustomSchema<{ Output: T; Input: T }> {}
