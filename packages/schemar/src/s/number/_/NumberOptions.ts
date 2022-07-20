// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface NumberOptions extends SchemaOptions {
	_out: number
	_in: number

	isInteger: boolean
	min: number | undefined
	max: number | undefined
}

export const defaultNumberOptions = {
	...defaultSchemaOptions,
	isInteger: false as const,
	min: undef,
	max: undef,
}

export type DefaultNumberOptions = typeof defaultNumberOptions & NumberOptions
