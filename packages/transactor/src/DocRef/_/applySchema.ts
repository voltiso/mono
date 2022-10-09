// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { ValidationError } from '@voltiso/schemar'
import { isPlainObject } from '@voltiso/util'

import type {
	DeepPartialIntrinsicFieldsSchema,
	IntrinsicFields,
} from '~/schemas'
import { isWithTransaction } from '~/Transaction'
import type { WithTransactor } from '~/Transactor'

import type { WithDocRef } from '../WithDocRef'
import { schemaDeleteIt } from './_symbols'

type Params = {
	schema: DeepPartialIntrinsicFieldsSchema
	data: object
	bestEffort?: boolean
}

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

export function applySchema(
	this: WithTransactor & WithDocRef,
	params: Params,
): IntrinsicFields | null {
	const { data, schema, bestEffort } = params

	const r = schema.exec(data)

	if (!r.isValid && !bestEffort) {
		const error = new ValidationError(r.issues)

		if (isWithTransaction(this) && this.transaction._error === null)
			this.transaction._error = error

		throw error
	}

	return processSentinels(r.value)
}
