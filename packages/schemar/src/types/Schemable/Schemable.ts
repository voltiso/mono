// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument } from '@voltiso/util'

import type { $$Inferable, $$Schema, Inferable, ISchema, Schema } from '~'

//

export type Schemable<T = NoArgument> = T extends NoArgument
	? ISchema | Inferable
	: Schema<T> | (T & Inferable)

//

export type ISchemable = ISchema | Inferable

export type $$Schemable = $$Schema | $$Inferable
