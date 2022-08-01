// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import {
	type InferableLiteral,
	type SchemaOptions,
	defaultSchemaOptions,
} from '~'

export interface UnknownLiteralOptions extends SchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral
}

export const defaultUnknownLiteralOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as InferableLiteral,
	Input: 0 as InferableLiteral,
}))

export type DefaultUnknownLiteralOptions = typeof defaultUnknownLiteralOptions
