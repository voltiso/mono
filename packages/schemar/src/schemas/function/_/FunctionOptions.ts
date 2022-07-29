// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { IRootSchema, SchemaOptions } from '../../../Schema/index'
import { defaultSchemaOptions } from '../../../Schema/index'
import * as s from '../../index'

export interface FunctionOptions extends SchemaOptions {
	_out: (...args: never) => unknown
	_in: (...args: never) => unknown

	arguments: (s.ITuple | s.IArray) & IRootSchema
	result: IRootSchema
}

export const defaultFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	arguments: s.array(s.never),
	result: s.unknown,
}))

export type DefaultFunctionOptions = typeof defaultFunctionOptions
