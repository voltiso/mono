// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyValue } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema'

import { any } from '../any'
import { array } from '../array'
import { unknown } from '../unknown'

export const defaultFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as (...args: any) => unknown,
	Input: 0 as unknown as (...args: any) => unknown,

	arguments: array(any) as unknown as t.SchemaLike<any[]>,
	result: unknown as unknown as t.SchemaLike<unknown>,
}))