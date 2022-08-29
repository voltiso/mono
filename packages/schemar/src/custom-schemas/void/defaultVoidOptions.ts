import { defaultSchemaOptions } from '~/Schema'

export const defaultVoidOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as void,
	Input: 0 as unknown as void,
}
