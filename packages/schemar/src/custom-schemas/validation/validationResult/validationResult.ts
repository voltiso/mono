// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemableLike } from '@voltiso/schemar.types'

import { array } from '~/custom-schemas/array'
import { tuple } from '~/custom-schemas/tuple'
import { union } from '~/custom-schemas/union'
import { unknown } from '~/custom-schemas/unknown'

import { validationIssue } from '../validationIssue'

export function validationResult<Value extends SchemableLike>(value: Value) {
	return union(
		{
			isValid: true,
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			value: value as Value, //! TS bug?
			issues: tuple(),
		} as const,
		{
			isValid: false,
			value: unknown,
			issues: array(validationIssue).minLength(1),
		} as const,
	)
}
