// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, Output_ } from '@voltiso/schemar'
import { isValidationError } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'

import type { WithTransactor } from '~/Transactor'

export function guardedValidate<S extends $$Schemable>(
	ctx: WithTransactor,
	schemable: S,
	data: unknown,
): Output_<S> {
	const mySchema = s.schema(schemable)

	try {
		return mySchema.validate(data) as never
	} catch (error) {
		if (!isValidationError(error)) throw error

		const rawOption = ctx.transactor._options.onValidationError

		const onValidationErrorResult =
			(typeof rawOption === 'function' ? rawOption(error) : rawOption) ||
			'error'

		if (onValidationErrorResult === 'ignore') {
			// best-effort
			return mySchema.tryValidate(data) as never // ! cast
		} else throw error
	}
}
