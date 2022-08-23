// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaLike, SchemaOptions } from '~'
import { defaultSchemaOptions, unknown } from '~'

export interface ArrayOptions extends SchemaOptions {
	Output: readonly unknown[]
	Input: readonly unknown[]

	element: SchemaLike

	isReadonlyArray: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

//

export const defaultArrayOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as readonly unknown[],
	Input: 0 as unknown as readonly unknown[],

	isReadonlyArray: false as const,

	element: unknown,
	minLength: undefined,
	maxLength: undefined,
}

export type DefaultArrayOptions = typeof defaultArrayOptions

export const defaultMutableArrayOptions = {
	...defaultArrayOptions,
	isReadonlyArray: false as const,
}

export type DefaultMutableArrayOptions = typeof defaultMutableArrayOptions

//

export const defaultReadonlyArrayOptions = {
	...defaultArrayOptions,
	isReadonlyArray: true as const,
}

export type DefaultReadonlyArrayOptions = typeof defaultReadonlyArrayOptions
