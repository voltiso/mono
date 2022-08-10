// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { __, ___ } from './Flatten'

export type $_<T> = T extends any ? { [k in keyof T]: T[k] } : never
export type $__<T> = T extends any ? __<T> : never
export type $___<T> = T extends any ? ___<T> : never
