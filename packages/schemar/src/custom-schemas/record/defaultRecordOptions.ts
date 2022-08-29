import { lazyValue } from '@voltiso/util'
import { number, string, symbol, union, unknown } from '~/custom-schemas'
import { defaultSchemaOptions } from '~/Schema'

export const defaultRecordOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as Record<keyof any, unknown>,
	Input: 0 as unknown as Record<keyof any, unknown>,

	keySchema: lazyValue(() => union(string, number, symbol)),
	valueSchema: unknown,
}
