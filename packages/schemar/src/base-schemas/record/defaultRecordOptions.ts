// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import { number, string, symbol, or, unknown } from '~/base-schemas'
import { defaultSchemaOptions } from '~/Schema'

export const defaultRecordOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as Record<keyof any, unknown>,
	Input: 0 as unknown as Record<keyof any, unknown>,

	keySchema: lazyValue(() => or(string, number, symbol)),
	valueSchema: unknown,
}
