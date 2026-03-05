// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Inferable, $$Schema, Inferable, Schema } from '~'

//

export type Schemable<T = unknown> = Schema<T> | Inferable<T>

//

// export type ISchemable = Schema | Inferable

export type $$Schemable = $$Schema | $$Inferable
