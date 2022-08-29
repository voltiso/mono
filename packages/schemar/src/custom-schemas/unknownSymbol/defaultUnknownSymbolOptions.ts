import { defaultSchemaOptions } from '~/Schema'

export const defaultUnknownSymbolOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as symbol,
	Input: 0 as unknown as symbol,
}
