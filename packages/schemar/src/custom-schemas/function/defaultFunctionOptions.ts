// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyValue } from '@voltiso/util'

import { any, array, unknown } from '~/custom-schemas'
import { defaultSchemaOptions } from '~/Schema'

export const defaultFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as (...args: any) => unknown,
	Input: 0 as unknown as (...args: any) => unknown,

	arguments: array(any) as unknown as t.SchemaLike<any[]>,
	result: unknown as unknown as t.SchemaLike<unknown>,
}))
