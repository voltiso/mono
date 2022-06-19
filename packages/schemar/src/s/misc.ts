import { lazyValue } from '@voltiso/ts-util'
import { unknown } from './unknown'

export const optional = lazyValue(() => unknown.optional)
export const readonly = lazyValue(() => unknown.readonly)

// function default_<T>(defaultValue: T) {
// 	return unknown.default(defaultValue)
// }
// export { default_ as default }
