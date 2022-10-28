// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Inferable } from '~/Inferable'
import type { InferSchemaNoReadonlyTuple } from '~/InferSchema'
import type { $$Schema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

export interface InferSchemaFunction {
	<T extends $$Inferable>(inferable: T): InferSchemaNoReadonlyTuple<T>
	<T extends $$Schema>(schema: T): T
	<T extends $$Schemable>(inferableOrSchema: T): InferSchemaNoReadonlyTuple<T>
}
