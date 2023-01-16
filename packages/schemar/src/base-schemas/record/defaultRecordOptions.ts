// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert, lazyValue } from '@voltiso/util'

import { number, or, string, symbol, unknown } from '~/base-schemas'
import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

$assert(defaultSchemaOptions)

export const defaultRecordOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as Record<keyof any, unknown>,
	Input: 0 as unknown as Record<keyof any, unknown>,

	keySchema: lazyValue(() => or(string, number, symbol)),
	valueSchema: unknown,
})
