// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { IRootSchema, SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'
import { unknown } from '../../unknown'

export interface ArrayOptions extends SchemaOptions {
	_out: readonly unknown[]
	_in: readonly unknown[]

	element: IRootSchema

	readonlyArray: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

//

const defaultArrayOptions = {
	...defaultSchemaOptions,
	element: unknown,
	minLength: undef,
	maxLength: undef,
}

export const defaultMutableArrayOptions = {
	...defaultArrayOptions,
	readonlyArray: false as const,
}

export type DefaultMutableArrayOptions = typeof defaultMutableArrayOptions

//

export const defaultReadonlyArrayOptions = {
	...defaultArrayOptions,
	readonlyArray: true as const,
}

export type DefaultReadonlyArrayOptions = typeof defaultReadonlyArrayOptions
