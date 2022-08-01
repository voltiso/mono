// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface NumberOptions extends SchemaOptions {
	Output: number
	Input: number

	isInteger: boolean
	min: number | undefined
	max: number | undefined
}

export const defaultNumberOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as number,
	Input: 0 as unknown as number,

	isInteger: false as const,
	min: undef,
	max: undef,
}

export type DefaultNumberOptions = typeof defaultNumberOptions
