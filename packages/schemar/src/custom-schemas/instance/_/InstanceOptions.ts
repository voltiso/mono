// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface InstanceOptions extends SchemaOptions {
	Constructor: abstract new (...args: any[]) => object
	Output: object
	Input: object
}

export const defaultInstanceOptions = {
	...defaultSchemaOptions,
	Constructor: 0 as unknown as abstract new (...args: any[]) => object,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,
}

export type DefaultInstanceOptions = typeof defaultInstanceOptions
