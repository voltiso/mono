// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface BooleanOptions extends SchemaOptions {
	_out: boolean
	_in: boolean
}

export const defaultBooleanOptions = defaultSchemaOptions

export type DefaultBooleanOptions = typeof defaultBooleanOptions &
	BooleanOptions
