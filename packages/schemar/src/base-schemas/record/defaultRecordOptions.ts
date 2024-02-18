// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, lazyObject } from '@voltiso/util'

import { number, or, string, symbol, unknown } from '~/base-schemas'
import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

$fastAssert(defaultSchemaOptions)

export const defaultRecordOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as Record<keyof any, unknown>,
	Input: 0 as unknown as Record<keyof any, unknown>,

	keySchema: lazyObject(() => or(string, number, symbol)),
	valueSchema: unknown,
})
