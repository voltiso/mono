// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '@voltiso/util'

import type {
	DefaultSchemaOptions,
	SchemaLike,
	SchemaOptions,
	SimpleSchema,
} from '~'

export interface ArrayOptions extends SchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	element: SchemaLike

	isReadonlyArray: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

//

export interface DefaultArrayOptions extends DefaultSchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	isReadonlyArray: false

	element: SimpleSchema<unknown>
	minLength: undefined
	maxLength: undefined
}

export type DefaultMutableArrayOptions = Merge2_<
	DefaultArrayOptions,
	{ isReadonlyArray: false }
>

export type DefaultReadonlyArrayOptions = Merge2_<
	DefaultArrayOptions,
	{ isReadonlyArray: true }
>
