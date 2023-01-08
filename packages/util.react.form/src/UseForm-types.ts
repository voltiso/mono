// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	INestedSubject,
	INestedSubjectWithSchema,
	NestedSubject,
	ReadonlyNestedSubject,
} from '@voltiso/observer'
import type {
	$$Schemable,
	$$SchemableObject,
	GetShape,
	SchemableWithShape,
	Type,
	Type_,
	ValidationIssue,
} from '@voltiso/schemar'
import type { DOMAttributes } from 'react'

import type { UseFormValidators } from './Validators'

export namespace UseForm {
	export type Options<S extends $$SchemableObject> = {
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

	export type MutableState<S extends $$SchemableObject> = {
		inputs: UseForm.InputState[]

		issuesByPath: Map<string, ValidationIssue[]>

		result$: NestedSubject<UseForm.RawResult<S>>
	}

	export type ResultFields<S extends $$Schemable> = S extends SchemableWithShape
		? {
				[k in keyof GetShape<S>]: ResultFields<
					GetShape<S>[k] extends $$Schemable ? GetShape<S>[k] : never
				>
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

	export type RawResult<S extends $$SchemableObject> = {
		props: {
			onSubmit: Exclude<DOMAttributes<HTMLFormElement>['onSubmit'], undefined>
			ref: (instance: HTMLFormElement | null) => void
		}

		fields: ResultFields<S>
	}

	export type Result<S extends $$SchemableObject> = ReadonlyNestedSubject<
		RawResult<S>
	>
}
