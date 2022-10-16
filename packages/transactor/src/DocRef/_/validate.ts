// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepPartialIntrinsicFieldsSchema } from '~/schemas'

import { applySchema } from './applySchema'
import type { DocRefContextWithTransaction } from './Context'

/**
 * (pure) Apply schema asd return new data
 *
 * @param ctx - Context
 * @param data - Data without id
 * @param schema - Either full or partial schema
 * @returns New data after validation
 */
export function validate(
	ctx: DocRefContextWithTransaction,
	data: object | null,
	schema: DeepPartialIntrinsicFieldsSchema | null | undefined,
) {
	if (data && schema) {
		const validatedData = applySchema.call(ctx, { schema, data })
		return validatedData
		// return withoutId(validatedData, ctx.docRef.id)
	} else return data
}
