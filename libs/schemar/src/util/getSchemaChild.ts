// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting, isPlainObject } from '@voltiso/util'
import { SCHEMA_NAME } from '_'

import type { Output_, Schema, Schemable } from '~'
import {
	infer_,
	isObjectSchema,
	isSchema,
	isTupleSchema,
	isUnknownTupleSchema,
} from '~'
import * as s from '~/base-schemas'

export function getSchemaChild<S extends Schema, Key extends keyof Output_<S>>(
	schema: S,
	child: Key,
): Schemable<Output_<S>[Key]> {
	assertNotPolluting(child)

	if (isUnknownTupleSchema(schema)) {
		const index = Number(child)

		if (Number.isNaN(index)) {
			throw new TypeError(`Invalid tuple index: ${child as string}`)
		}

		return s.unknown as never
	}

	if (isTupleSchema(schema)) {
		const index = Number(child)

		if (Number.isNaN(index)) {
			throw new TypeError(`Invalid tuple index: ${child as string}`)
		}

		if (index < 0 || index >= schema.getShape.length) {
			throw new RangeError(`Tuple index out of bounds: ${child as string}`)
		}

		return schema.getShape[index] as never
	}

	if (isObjectSchema(schema)) {
		if ((child as Key) in schema.getShape) {
			return schema.getShape[child as never]
		}

		for (const indexSignature of schema.getIndexSignatures) {
			if (
				(infer_(indexSignature.keySchema) as unknown as Schema).isValid(child)
			) {
				return indexSignature.valueSchema as never
			}
		}

		throw new Error(
			`Object schema does not have property or index signature matching key ${String(
				child,
			)}`,
		)
	}

	// if (isSchema(schema)) {
	throw new Error(
		`${schema[SCHEMA_NAME]} schema does not have children or index signatures defined`,
	)
	// }
}

export function getSchemableChild<
	S extends Schemable,
	Key extends keyof Output_<S>,
>(schemable: S, child: Key): Schemable<Output_<S>[Key]> {
	if (isSchema(schemable))
		return getSchemaChild(schemable, child as never) as never

	assertNotPolluting(child)

	/** Inferable object */
	if (isPlainObject(schemable)) {
		if ((child as Key) in schemable) return schemable[child as never]

		throw new Error(`Inferable object does not have property ${String(child)}`)
	}

	/** Inferable tuple */
	if (Array.isArray(schemable)) {
		const index = Number(child)

		if (Number.isNaN(index)) {
			throw new TypeError(`Invalid tuple index: ${child as string}`)
		}

		if (index < 0 || index >= schemable.length) {
			throw new RangeError(`Tuple index out of bounds: ${child as string}`)
		}

		return schemable[child as never] as never
	}

	throw new TypeError('Invalid inferable type')
}
