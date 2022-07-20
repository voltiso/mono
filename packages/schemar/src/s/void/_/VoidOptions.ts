// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface VoidOptions extends SchemaOptions {
	_out: void
	_in: void
}

export const defaultVoidOptions = {
	...defaultSchemaOptions,
}

export type DefaultVoidOptions = typeof defaultVoidOptions & VoidOptions
