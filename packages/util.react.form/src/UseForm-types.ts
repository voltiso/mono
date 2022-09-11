// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	NestedSubject,
	NestedSubjectWithSchema,
	ReadonlyNestedSubject,
} from '@voltiso/observer'
import type {
	GetShape,
	SchemableLike,
	SchemableObjectLike,
	SchemableWithShape,
	Type,
	Type_,
	ValidationIssue,
} from '@voltiso/schemar.types'
import type { DOMAttributes } from 'react'

import type { UseFormValidators } from './Validators'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UseForm {
	export type Options<S extends SchemableObjectLike> = {
		data$: NestedSubjectWithSchema<S>
		// state: NestedSubject<UseFormState>
		validators?: UseFormValidators<Type<S>> | undefined
		// onBeforeSubmit?: () => Promise<void> | void
		// onCancelSubmit?: () => Promise<void> | void
		onSubmit: (data$: NestedSubjectWithSchema<S>) => Promise<void> | void
		// onError?: (error: Error) => Promise<void> | void
	}

	export type InputState = {
		path: (keyof any)[]
		element: HTMLElement
	}

	export type MutableState<S extends SchemableObjectLike> = {
		inputs: UseForm.InputState[]

		result$: NestedSubject<UseForm.RawResult<S>>
	}

	export type ResultFields<S extends SchemableLike> =
		S extends SchemableWithShape
			? {
					[k in keyof GetShape<S>]: ResultFields<GetShape<S>[k]>
			  }
			: {
					props: {
						onChange: Exclude<
							DOMAttributes<HTMLInputElement>['onChange'],
							undefined
						>

						value?: Type_<S> extends boolean ? never : Type_<S>
						checked?: Type_<S> extends boolean ? Type_<S> : never
					}

					issues: ValidationIssue[]
			  }

	export type RawResult<S extends SchemableObjectLike> = {
		props: {
			onSubmit: Exclude<DOMAttributes<HTMLFormElement>['onSubmit'], undefined>
			ref: (instance: HTMLFormElement | null) => void
		}

		fields: ResultFields<S>
	}

	export type Result<S extends SchemableObjectLike> = ReadonlyNestedSubject<
		RawResult<S>
	>
}
