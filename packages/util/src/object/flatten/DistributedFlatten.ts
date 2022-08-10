// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { __, ___ } from './Flatten'

/** Distributive Flatten (1-level-deep) */
export type $_<T> = T extends any ? { [k in keyof T]: T[k] } : never

/** Distributive Flatten (2-level-deep) */
export type $__<T> = T extends any ? __<T> : never

/** Distributive Flatten (3-level-deep) */
export type $___<T> = T extends any ? ___<T> : never
