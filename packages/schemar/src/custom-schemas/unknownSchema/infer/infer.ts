// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	InferableLike,
	InferableLiteral,
	InferSchemaNoReadonlyTuple,
	ISchema,
	SchemableLike,
	SchemaLike,
} from '@voltiso/schemar.types'
import { getValues, isConstructor } from '@voltiso/util'

import { instance, literal, object, tuple } from '~/custom-schemas'
import { isSchema } from '~/Schema/isSchema'

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
	else {
		/**
		 * If possible, default to `{}` so that it accepts `undefined` (only
		 * possible if no input properties are required)
		 */
		let allChildrenOptional = true
		for (const value of getValues(t as object, { includeSymbols: true })) {
			const childSchema = infer(value) as ISchema
			if (
				!childSchema.isOptional &&
				!childSchema.isStrictOptional &&
				!childSchema.hasDefault
			) {
				allChildrenOptional = false
				break
			}
		}
		if (allChildrenOptional)
			return object(t as never).default({} as never) as never
		else return object(t as never) as never
	}
}
