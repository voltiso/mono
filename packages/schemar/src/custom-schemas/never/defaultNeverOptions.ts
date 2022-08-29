import { defaultSchemaOptions } from '~/Schema'

export const defaultNeverOptions = {
	...defaultSchemaOptions,
	Output: 0 as never,
	Input: 0 as never,
}
