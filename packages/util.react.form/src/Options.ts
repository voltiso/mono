// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType, InferableObject } from '@voltiso/schemar'
import type { Stylable } from '@voltiso/styler'

import type { CheckboxProps } from './_/CheckboxProps'
import type { FormProps } from './FormProps'
import type { TextProps } from './TextProps'
import type { Validators } from './Validators'

export interface Options<S extends InferableObject> {
	schema: S
	storageKey?: string
	validators?: Validators<GetType<S>>
	onBeforeSubmit?: () => Promise<void> | void
	onCancelSubmit?: () => Promise<void> | void
	onSubmit: (data: GetType<S>) => Promise<void> | void
	onError?: (error: Error) => Promise<void> | void
	Form?: Stylable<FormProps>
	Text?: Stylable<TextProps>
	Checkbox?: Stylable<CheckboxProps>
}
