// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface BooleanOptions extends SchemaOptions {
	Output: boolean
	Input: boolean
}

export const defaultBooleanOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as boolean,
	Input: 0 as unknown as boolean,
}

export type DefaultBooleanOptions = typeof defaultBooleanOptions
