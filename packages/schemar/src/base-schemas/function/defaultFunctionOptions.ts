// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue, noThis } from '@voltiso/util'

import type * as t from '~'
import { defaultSchemaOptions } from '~'

import { any } from '../any'
import { array } from '../array'
import { unknown } from '../unknown'

export const defaultFunctionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
	Output: 0 as unknown as (...args: any) => unknown,
	Input: 0 as unknown as (...args: any) => unknown,

	this: noThis,
	parameters: array(any) as unknown as t.SchemaLike<any[]>,
	return: unknown as unknown as t.SchemaLike<void>,
}))
