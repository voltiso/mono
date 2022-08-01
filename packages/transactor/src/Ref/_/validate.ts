// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'

import type { DataWithoutId } from '~/Data'
import { withoutId } from '~/Data'

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
	data: DataWithoutId | null,
	schema: s.Schema<object> | null | undefined,
) {
	if (data && schema) {
		const validatedData = applySchema.call(ctx, { schema, data })
		return withoutId(validatedData, ctx.docRef.id)
	} else return data
}
