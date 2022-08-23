// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject, Type } from '@voltiso/schemar'
import type { Stylable } from '@voltiso/styler'
import type { PartialOrUndefined } from '@voltiso/util'

import type { CheckboxProps } from './_/CheckboxProps'
import type { FormProps } from './FormProps'
import type { TextProps } from './TextProps'
import type { Validators } from './Validators'

export type Options<S extends InferableObject> = {
	schema: S
} & PartialOrUndefined<{
	storageKey?: string
	validators?: Validators<Type<S>>
	onBeforeSubmit?: () => Promise<void> | void
	onCancelSubmit?: () => Promise<void> | void
	onSubmit: (data: Type<S>) => Promise<void> | void
	onError?: (error: Error) => Promise<void> | void
	Form?: Stylable<FormProps>
	Text?: Stylable<TextProps>
	Checkbox?: Stylable<CheckboxProps>
}>
