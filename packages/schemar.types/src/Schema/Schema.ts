// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument } from '@voltiso/util'

import type { CustomSchema, ISchema } from '~/Schema'

export type Schema<T extends unknown | NoArgument = NoArgument> =
	T extends NoArgument ? ISchema : SimpleSchema<T>

// [
// 	T,
// ] extends [never]
// 	? SimpleSchema<never>
// 	: T extends NoArgument
// 	? ISchema
// 	: SimpleSchema<T>

// export type $Schema<T extends OptionalArgument<unknown> = NoArgument> =
// 	T extends any ? Schema<T> : never

export interface SimpleSchema<T>
	extends CustomSchema<{ Output: T; Input: T }> {}
