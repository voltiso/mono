// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	INestedSubject,
	INestedSubjectWithSchema,
	NestedSubject,
	ReadonlyNestedSubject,
} from '@voltiso/observer'
import type {
	$$Schemable,
	GetShape,
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
		schemable: S

		data$?: INestedSubject | INestedSubjectWithSchema | undefined
		// | NestedSubject<Type_<S>>
		// | NestedSubjectWithSchema<S>
		// | AlsoAccept<INestedSubject | INestedSubjectWithSchema>

		validators?: UseFormValidators<Type<S>> | undefined
		// onBeforeSubmit?: () => Promise<void> | void
		// onCancelSubmit?: () => Promise<void> | void
		onSubmit: (data$: Type_<S>) => Promise<void> | void
		// onError?: (error: Error) => Promise<void> | void
	}

	export type InputState = {
		path: (keyof any)[]
		element: HTMLElement
	}

	export type MutableState<S extends SchemableObjectLike> = {
		inputs: UseForm.InputState[]

		issuesByPath: Map<string, ValidationIssue[]>

		result$: NestedSubject<UseForm.RawResult<S>>
	}

	export type ResultFields<S extends $$Schemable> =
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
