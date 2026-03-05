// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, Output_, Schema } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { isValidationError } from '@voltiso/schemar'

import type { WithTransactor } from '~/Transactor'

export function guardedValidate<S extends $$Schemable>(
	ctx: WithTransactor,
	schemable: S,
	data: unknown,
): S extends any ? Output_<S> : never {
	return guardedValidate_(ctx, schemable, data) as never
}

/**
 * Non-generic version for faster type-check (especially in generic contexts)
 *
 * @throws Non-ValidationError errors
 */
export function guardedValidate_(
	ctx: WithTransactor,
	schemable: $$Schemable,
	data: unknown,
): unknown {
	// console.log('guardedValidate', schemable, data)

	const mySchema: Schema = s.schema(schemable) as never // TODO fix schemar

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
