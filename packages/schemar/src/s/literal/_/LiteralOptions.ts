// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { InferableLiteral, SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface LiteralOptions extends SchemaOptions {
	_out: InferableLiteral
	_in: InferableLiteral
	values: Set<InferableLiteral>
}

export const defaultLiteralOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	values: new Set<InferableLiteral>(),
}))

export type DefaultLiteralOptions = typeof defaultLiteralOptions
