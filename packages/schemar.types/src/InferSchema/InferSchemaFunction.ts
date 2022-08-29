import type { InferableLike } from '~/Inferable'
import type { InferSchemaNoReadonlyTuple } from '~/InferSchema'
import type { SchemaLike } from '~/Schema'
import type { SchemableLike } from '~/Schemable'

export interface InferSchemaFunction {
	<T extends InferableLike>(inferable: T): InferSchemaNoReadonlyTuple<T>
	<T extends SchemaLike>(schema: T): T
	<T extends SchemableLike>(inferableOrSchema: T): InferSchemaNoReadonlyTuple<T>
}
