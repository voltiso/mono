// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'
import { ValidationError } from '@voltiso/schemar'
import { isPlainObject } from '@voltiso/util'

import type { WithDocRef } from '~'
import { isWithTransaction } from '~'
import type { Data, DataWithoutId } from '~/Data/Data'
import type { WithTransactor } from '~/Transactor'

import { schemaDeleteIt } from './_symbols'

type Params = {
	schema: s.Schema<object>
	data: DataWithoutId
	bestEffort?: boolean
}

function processSentinels(x: unknown): Data | null {
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
): Data | null {
	const { data, schema, bestEffort } = params

	const r = schema.tryValidate(data)

	if (!r.isValid && !bestEffort) {
		const error = new ValidationError(r.issues)

		if (isWithTransaction(this) && this.transaction._error === null)
			this.transaction._error = error

		throw error
	}

	return processSentinels(r.value)
}
