// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { ValidationError } from '@voltiso/schemar'
import type { ISchema } from '@voltiso/schemar'
import { isPlainObject } from '@voltiso/util'

import type { IntrinsicFields, IntrinsicFieldsSchema } from '~/schemas'
import { isWithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'

import type { WithDocRef } from '../WithDocRef'
import { schemaDeleteIt } from './_symbols'

function processSentinels(x: unknown): IntrinsicFields | null {
	if (isPlainObject(x)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const r = {} as any

		for (const [k, v] of Object.entries(x)) {
			// eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
			if (v !== schemaDeleteIt) r[k] = processSentinels(v)
		}

		return r as never
	} else return x as never
}

//

export function applySchema(
	ctx: WithTransactor & WithDocRef,
	options: {
		schema: IntrinsicFieldsSchema | null
		data: object | null | undefined
		bestEffort?: boolean | undefined
	},
): IntrinsicFields | null | undefined {
	const { data, schema, bestEffort } = options

	if (!data || !schema) return data as never // identity

	const r = (schema as ISchema).exec(data, {
		onUnknownProperty: ctx.transactor._options.onUnknownField,
	})

	if (!r.isValid && !bestEffort) {
		const error = new ValidationError(r.issues)

		if (isWithTransaction(ctx) && ctx.transaction._error === null)
			ctx.transaction._error = error

		throw error
	}

	// if (r.issues.length > 0) {
	// 	// have warnings
	// 	// eslint-disable-next-line no-console
	// 	console.warn(r.issues)
	// }

	return processSentinels(r.value)
}
