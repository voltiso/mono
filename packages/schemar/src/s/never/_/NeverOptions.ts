// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface NeverOptions extends SchemaOptions {
	_out: never
	_in: never
}

export const defaultNeverOptions = {
	...defaultSchemaOptions,
}

export type DefaultNeverOptions = typeof defaultNeverOptions & NeverOptions
