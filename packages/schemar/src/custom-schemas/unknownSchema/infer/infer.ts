// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	InferableLike,
	InferableLiteral,
	InferSchemaNoReadonlyTuple,
	SchemableLike,
	SchemaLike,
} from '@voltiso/schemar.types'
import { isConstructor } from '@voltiso/util'

import { isSchema } from '~'
import { instance, literal, object, tuple } from '~/custom-schemas'

//

//

/**
 * Infer schema (not type!)
 *
 * @param inferable - A value to infer schema from (object, tuple, literal, ...)
 */
export function infer<T extends InferableLike>(
	inferable: T,
): InferSchemaNoReadonlyTuple<T>

/**
 * Infer schema (not type!)
 *
 * - This overload is no-op (already a Schema!)
 *
 * @param schema - A value that is already a schema
 */
export function infer<T extends SchemaLike>(schema: T): T

/**
 * Infer schema (not type!)
 *
 * - This overload is a catch-all for previous overloads
 *
 * @param inferableOrSchema - An inferable value (object, tuple, literal, ...)
 *   or already schema
 */
export function infer<T extends SchemableLike>(
	inferableOrSchema: T,
): InferSchemaNoReadonlyTuple<T>

//

export function infer<T extends SchemableLike>(
	t: T,
): InferSchemaNoReadonlyTuple<T> {
	if (isSchema(t)) return t as never
	else if (
		t === null ||
		['string', 'number', 'symbol', 'boolean', 'bigint', 'undefined'].includes(
			typeof t,
		)
	) {
		return literal(t as InferableLiteral) as never
	} else if (isConstructor(t)) {
		return instance(t) as never
	} else if (Array.isArray(t)) return tuple(...t) as never
	else return object(t as never) as never
}
