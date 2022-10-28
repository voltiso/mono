// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsCompatible, NotProvided, OptionalArgument } from '@voltiso/util'

import type { CustomSchema, ISchema } from '~/Schema'

export type Schema<T extends OptionalArgument<unknown> = NotProvided> =
	IsCompatible<T, NotProvided> extends true ? ISchema : SimpleSchema<T>

// [
// 	T,
// ] extends [never]
// 	? SimpleSchema<never>
// 	: T extends NotProvided
// 	? ISchema
// 	: SimpleSchema<T>

// export type $Schema<T extends OptionalArgument<unknown> = NotProvided> =
// 	T extends any ? Schema<T> : never

export interface SimpleSchema<T>
	extends CustomSchema<{ Output: T; Input: T }> {}
