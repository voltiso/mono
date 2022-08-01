// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface AnyOptions extends SchemaOptions {
	Output: any
	Input: any
}

export const defaultAnyOptions = {
	...defaultSchemaOptions,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Output: 0 as any,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Input: 0 as any,
}

export type DefaultAnyOptions = typeof defaultAnyOptions
