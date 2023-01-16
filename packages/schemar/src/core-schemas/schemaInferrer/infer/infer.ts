// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getValues, isConstructor, isPlainObject } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	InferableLiteral,
	InferSchema$NoReadonlyTuple,
	ISchema$,
} from '~'
import { instance, nonNullish, object, tuple } from '~/base-schemas'
import { literal } from '~/core-schemas'
import { isSchema } from '~/Schema/isSchema'

/** Hackish overload for type-checking performance when argument is cast to never */
export function infer(_never: never): never

/**
 * Infer schema (not type!)
 *
 * @param inferableOrSchema - An inferable value (object, tuple, literal, ...)
 *   or already schema
 */
export function infer<T extends $$Schemable>(
	inferableOrSchema: T,
): InferSchema$NoReadonlyTuple<T>

export function infer(x: $$Schemable): $$Schema {
	return infer_(x)
}

//

/**
 * Use this non-generic version for faster type-check
 *
 * - Especially in generic contexts
 */
export function infer_(x: $$Schemable): $$Schema {
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	} else if (Array.isArray(x)) return tuple(...x) as never
	else if (isPlainObject(x) && Object.keys(x).length === 0) {
		return nonNullish as never
	} else {
		/**
		 * If possible, default to `{}` so that it accepts `undefined` (only
		 * possible if no input properties are required)
		 */
		let allChildrenOptional = true

		for (const value of getValues(x as object, { includeSymbols: true })) {
			const childSchema: ISchema$ = infer(value)

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

// /** Will this avoid variance check during type-check? (editor performance) */
// export const infer = _infer as unknown as {
// 	bivarianceHack: typeof _infer
// }['bivarianceHack']
