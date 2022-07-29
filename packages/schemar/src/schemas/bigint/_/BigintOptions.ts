// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '@voltiso/util'

import type { SchemaOptions } from '../../../Schema/index'
import { defaultSchemaOptions } from '../../../Schema/index'

export interface BigintOptions extends SchemaOptions {
	_out: bigint
	_in: bigint

	min: bigint | undefined
	max: bigint | undefined
}

export const defaultBigintOptions = {
	...defaultSchemaOptions,
	min: undef,
	max: undef,
}

export type DefaultBigintOptions = typeof defaultBigintOptions & BigintOptions
