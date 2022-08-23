// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject, ISchema, ValidationResult } from '@voltiso/schemar'
import { assumeType } from '@voltiso/util'
import { useContext } from 'react'

import type { FieldName } from './_/FieldName'
import { Context } from './Context'
import type { ValidationResults } from './ValidationResults'

export function useValidationResult<
	S extends InferableObject = Record<string, ISchema>,
>(field: FieldName<S>): ValidationResult | null {
	const context = useContext(Context)

	if (!context) return null

	assumeType<ValidationResults<S>>(context)

	// eslint-disable-next-line security/detect-object-injection
	return context[field] || null
}
