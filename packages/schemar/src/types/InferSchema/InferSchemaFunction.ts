// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Inferable,
	$$Schema,
	$$Schemable,
	InferSchema$NoReadonlyTuple,
} from '~'

export interface InferSchemaFunction {
	<T extends $$Inferable>(inferable: T): InferSchema$NoReadonlyTuple<T>
	<T extends $$Schema>(schema: T): T
	<T extends $$Schemable>(inferableOrSchema: T): InferSchema$NoReadonlyTuple<T>
}
