// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

type AnyFunction = (...args: any) => unknown

export interface UnknownFunctionOptions extends SchemaOptions {
	Output: AnyFunction
	Input: AnyFunction
}

export const defaultUnknownFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as AnyFunction,
	Input: 0 as unknown as AnyFunction,
}))

export type DefaultUnknownFunctionOptions = typeof defaultUnknownFunctionOptions
