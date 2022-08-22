// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { SchemableLike, SchemaOptions } from '~'
import { number, string, symbol, union, unknown } from '~'
import { defaultSchemaOptions } from '~'

export interface RecordOptions extends SchemaOptions {
	Output: Record<keyof any, unknown>
	Input: Record<keyof any, unknown>

	keySchema: { OutputType: keyof any; InputType: keyof any }
	valueSchema: SchemableLike
}

export const defaultRecordOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as Record<keyof any, unknown>,
	Input: 0 as unknown as Record<keyof any, unknown>,

	keySchema: lazyValue(() => union(string, number, symbol)),
	valueSchema: unknown,
}

export type DefaultRecordOptions = typeof defaultRecordOptions

// type K = OutputType<DefaultRecordOptions['keySchema']>
// type V = OutputType<DefaultRecordOptions['valueSchema']>
