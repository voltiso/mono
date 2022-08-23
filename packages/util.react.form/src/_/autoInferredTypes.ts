// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// below types are auto-inferred using VSCode - but the useForm function failed to export without them
// (type too long to serialize - explicit type annotation required)

import type { InferableObject,InputType } from '@voltiso/schemar'
import type { StyledComponent } from '@voltiso/styler'
import type { FC, FormEvent } from 'react'

import type { FormProps } from '~/FormProps'
import type { TextProps } from '~/TextProps'

import type { CheckboxProps } from './CheckboxProps'
import type { FieldName } from './FieldName'

export interface OFormType
	extends StyledComponent<
		Omit<FormProps, 'ref' | 'onSubmit'> & {
			ref?:
				| React.RefObject<HTMLFormElement>
				| ((inst: HTMLFormElement) => void)
				| null
				| undefined
			onSubmit?: ((event: FormEvent<HTMLFormElement>) => void) | undefined
		}
	> {}

export interface OTextType<S extends InferableObject>
	extends StyledComponent<
		Omit<
			Omit<TextProps, 'field'> & {
				field: FieldName<InputType<S>, string>
			},
			'ref' | 'value' | 'onChange' | 'id'
		>
	> {}

export interface OCheckboxType<
	S extends InferableObject,
> extends StyledComponent<
		Omit<
			Omit<CheckboxProps, 'field'> & {
				field: FieldName<InputType<S>, boolean>
			},
			'ref' | 'value' | 'onChange' | 'id'
		>
	> {}

export interface OCheckboxSetType<S extends InferableObject>
	extends FC<{
		field: FieldName<InputType<S>, string[]> & string
	}> {}
