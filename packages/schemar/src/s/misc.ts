// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import { unknown } from './unknown'

export const optional = lazyValue(() => unknown.optional)
export const readonly = lazyValue(() => unknown.readonly)

// function default_<T>(defaultValue: T) {
// 	return unknown.default(defaultValue)
// }
// export { default_ as default }