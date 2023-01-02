// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar.types'

import { array, or, tuple, unknown } from '~/base-schemas'

import { validationIssue } from '../validationIssue'

export function validationResult<Value extends $$Schemable>(value: Value) {
	return or(
		{
			isValid: true,
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			value: value as Value, //! TS bug?
			issues: tuple(),
		},
		{
			isValid: false,
			value: unknown,
			issues: array(validationIssue).minLength(1),
		},
	)
}
