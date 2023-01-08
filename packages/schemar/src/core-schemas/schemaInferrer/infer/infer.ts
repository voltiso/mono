// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getValues, isConstructor } from '@voltiso/util'

import type {
	$$Inferable,
	$$Schema,
	$$Schemable,
	InferableLiteral,
	InferSchemaNoReadonlyTuple,
	ISchema,
} from '~'
import { instance, object, tuple } from '~/base-schemas'
import { literal } from '~/core-schemas'
import { isSchema } from '~/Schema/isSchema'

/**
 * Infer schema (not type!)
 *
 * @param inferable - A value to infer schema from (object, tuple, literal, ...)
 */
export function infer<T extends $$Inferable>(
	inferable: T,
): InferSchemaNoReadonlyTuple<T>

/**
 * Infer schema (not type!)
 *
 * - This overload is no-op (already a Schema!)
 *
 * @param schema - A value that is already a schema
 */
export function infer<T extends $$Schema>(schema: T): T

/**
 * Infer schema (not type!)
 *
 * - This overload is a catch-all for previous overloads
 *
 * @param inferableOrSchema - An inferable value (object, tuple, literal, ...)
 *   or already schema
 */
export function infer<T extends $$Schemable>(
	inferableOrSchema: T,
): InferSchemaNoReadonlyTuple<T>

//

export function infer<T extends $$Schemable>(
	x: T,
): InferSchemaNoReadonlyTuple<T> {
	if (isSchema(x)) {
		return x as never
	} else if (
		x === null ||
		['string', 'number', 'symbol', 'boolean', 'bigint', 'undefined'].includes(
			typeof x,
		)
	) {
		return literal(x as InferableLiteral) as never
	} else if (isConstructor(x)) {
		return instance(x) as never
	} else if (Array.isArray(x)) return tuple(...x) as never
	else {
		/**
		 * If possible, default to `{}` so that it accepts `undefined` (only
		 * possible if no input properties are required)
		 */
		let allChildrenOptional = true

		for (const value of getValues(x as object, { includeSymbols: true })) {
			const childSchema = infer(value) as unknown as ISchema
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
			return object(x as never).default({} as never) as never
		else return object(x as never) as never
	}
}
