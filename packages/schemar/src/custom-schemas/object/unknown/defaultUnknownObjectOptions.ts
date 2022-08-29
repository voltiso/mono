import { defaultSchemaOptions } from '~/Schema'

export const defaultUnknownObjectOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,
}
