// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { type SchemaOptions, defaultSchemaOptions } from '~'

export interface NeverOptions extends SchemaOptions {
	Output: never
	Input: never
}

export const defaultNeverOptions = {
	...defaultSchemaOptions,
	Output: 0 as never,
	Input: 0 as never,
}

export type DefaultNeverOptions = typeof defaultNeverOptions
