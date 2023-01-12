// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Inferable, $$Schema, Inferable, ISchema, Schema } from '~'

//

export type Schemable<T = unknown> = unknown extends T
	? ISchema | Inferable
	: Schema<T> | Inferable<T>

//

export type ISchemable = ISchema | Inferable

export type $$Schemable = $$Schema | $$Inferable
