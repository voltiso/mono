// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface BigintOptions extends SchemaOptions {
	Output: bigint
	Input: bigint

	min: bigint | undefined
	max: bigint | undefined
}

export const defaultBigintOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as bigint,
	Input: 0 as unknown as bigint,

	min: undef,
	max: undef,
}

export type DefaultBigintOptions = typeof defaultBigintOptions
