// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject } from '@voltiso/schemar'

import type {
	OCheckboxSetType,
	OCheckboxType,
	OFormType,
	OTextType,
} from './_/autoInferredTypes'

export interface UseFormResult<S extends InferableObject> {
	Form: OFormType
	Text: OTextType<S>
	Checkbox: OCheckboxType<S>
	CheckboxSet: OCheckboxSetType<S>
}
