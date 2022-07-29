// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface VoidOptions extends SchemaOptions {
	Output: void
	Input: void
}

export const defaultVoidOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as void,
	Input: 0 as unknown as void,
}

export type DefaultVoidOptions = typeof defaultVoidOptions & VoidOptions
