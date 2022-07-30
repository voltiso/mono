// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { InferableLiteral, SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface LiteralOptions extends SchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral
	values: Set<InferableLiteral>
}

export const defaultLiteralOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as InferableLiteral,
	Input: 0 as unknown as InferableLiteral,
	values: new Set<InferableLiteral>(),
}))

export type DefaultLiteralOptions = typeof defaultLiteralOptions
