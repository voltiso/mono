// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$SchemableObject,
	InferableLiteral,
	InferableObject,
	SchemableObject,
	SchemaLike,
	Type_,
	ValidationIssue,
} from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { PropertyPath } from '@voltiso/util'
import { deepMapValues, get, tryGet } from '@voltiso/util'
import { useInitial } from '@voltiso/util.react'
import { NestedSubject } from '@voltiso/util.rxjs'
import type { ChangeEvent, FormEvent } from 'react'
import { useMemo } from 'react'

import type { UseForm } from './UseForm-types'

function _register<S extends $$SchemableObject>(
	mutableState: UseForm.MutableState<S>,
	path: (keyof any)[],
	element: HTMLElement,
) {
	for (const input of mutableState.inputs)
		if (input.path.join('.') === path.join('.')) return

	mutableState.inputs.push({ path, element })
}

function _initializeResult<S extends $$SchemableObject>(
	options: UseForm.Options<S>,
	mutable: UseForm.MutableState<S>,
): UseForm.RawResult<S> {
	const deepShape = s.infer(options.schemable as SchemableObject).getDeepShape

	const data$: NestedSubject<Type_<S>> = (options.data$ ||
		new NestedSubject<Type_<S>>({} as never)) as never

	const fields = deepMapValues(
		deepShape,
		(_value: SchemaLike | InferableLiteral, path) => {
			const dataValue$ = get(
				data$,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				...(path as any),
			) as unknown as NestedSubject<string>

			const deepShapeEntry = s.schema(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				get(deepShape as any, ...(path as any)) as unknown as InferableObject,
			)

			const validate = (value: string) => {
				const validationResult = deepShapeEntry.exec(value)
				mutable.issuesByPath.set(path.join('.'), validationResult.issues)
				return validationResult
			}

			// check for initial issues
			const initialValidationResult = validate(dataValue$.value)

			return {
				issues: initialValidationResult.issues,

				props: {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unnecessary-condition
					value: tryGet(data$.value as never, ...(path as any)) || '',

					onChange: (event: ChangeEvent<HTMLInputElement>) => {
						const value = event.target.value
						dataValue$.set(value as never)

						const valuePropPath = [
							...path,
							'props',
							'_',
							'value',
						] as unknown as PropertyPath<typeof mutable.result$.fields>

						const valueProp$ = get(
							mutable.result$.fields,
							...valuePropPath,
						) as NestedSubject<unknown>

						valueProp$.set(value)

						const validationResult = validate(value)

						const issuesPath = [...path, 'issues'] as unknown as PropertyPath<
							typeof mutable.result$.fields
						>
						const issues$ = get(
							mutable.result$.fields,
							...issuesPath,
						) as unknown as NestedSubject<ValidationIssue[]>

						issues$.set(validationResult.issues)
					},

					ref: (instance: HTMLInputElement | null) => {
						if (instance) {
							_register(mutable, path, instance)
						}
					},
				},
			}
		},
	) as unknown as UseForm.ResultFields<S>

	return {
		props: {
			onSubmit: (event: FormEvent<HTMLFormElement>) => {
				event.preventDefault()

				for (const input of mutable.inputs) {
					const path = input.path.join('.')
					const issues = mutable.issuesByPath.get(path) || []
					if (issues.length > 0) {
						// do not submit - set focus on first issue
						input.element.focus()
						if (input.element instanceof HTMLInputElement) {
							const position = input.element.value.length
							input.element.selectionStart = position
							input.element.selectionEnd = position
						}
						return
					}
				}

				void options.onSubmit(data$.value)
			},

			ref: instance => {
				// reset input refs list on re-render
				if (!instance) mutable.inputs.length = 0
			},
		},

		fields,
	}
}

export const useForm = <S extends $$SchemableObject>(
	options: UseForm.Options<S>,
): UseForm.Result<S> => {
	const mutable = useInitial<UseForm.MutableState<S>>(() => ({
		inputs: [] as never,
		issuesByPath: new Map<string, ValidationIssue[]>(),
		result$: 0 as never,
	}))

	mutable.result$ = useMemo(
		() => {
			const initialValue = _initializeResult<S>(options, mutable)

			const nestedSubject$ = new NestedSubject<UseForm.RawResult<S>>(
				initialValue,
			)

			// const subs = (nestedSubject.fields as NestedSubject<unknown>).subscribe(
			// 	value => {
			// 		console.log('!! INITIAL', value)
			// 	},
			// )

			// subs.unsubscribe()

			return nestedSubject$
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	)

	return mutable.result$ as never

	// const handleError = useCallback(
	// 	async (e: unknown) => {
	// 		if (current.onError && e instanceof Error) await current.onError(e)
	// 		// eslint-disable-next-line no-console
	// 		else console.error('unhandled exotic error', e)
	// 	},
	// 	[current],
	// )

	// const validate = useCallback(
	// 	// eslint-disable-next-line complexity, unicorn/no-object-as-default-parameter
	// 	async (options = { beforeSubmit: false }) => {
	// 		try {
	// 			let focusSet = false
	// 			// console.log('validate 1')
	// 			const r = schema.exec(state.data)
	// 			let validationResults: ValidationResults<I> = {}
	// 			if (!r.isValid) {
	// 				for (const issue of r.issues) {
	// 					const { path } = issue
	// 					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	// 					let c = validationResults as any
	// 					for (const p of path) {
	// 						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-multi-assign, security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
	// 						c = c[p] = c[p] || {}
	// 					}
	// 					const r = c as ValidationResult
	// 					const issues = r.issues || []
	// 					issues.push({
	// 						message: issue.toString(),
	// 					})
	// 					r.success = false
	// 					r.issues = issues
	// 				}
	// 				// console.log({ validationResults })
	// 			}
	// 			validationResults = {
	// 				...state.validationResults,
	// 				...validationResults,
	// 			}
	// 			for (const k of getKeys(state.data)) {
	// 				if (
	// 					// eslint-disable-next-line security/detect-object-injection
	// 					!validationResults[k] &&
	// 					// eslint-disable-next-line security/detect-object-injection
	// 					!(current.validators || ({} as any))[k]
	// 				) {
	// 					// eslint-disable-next-line security/detect-object-injection
	// 					validationResults[k] = { success: true }
	// 				}
	// 			}
	// 			state.validationResults = validationResults
	// 			let haveErrors = false
	// 			for (const r of getValues(state.validationResults)) {
	// 				if (r?.success === false) haveErrors = true
	// 			}
	// 			if (haveErrors && options.beforeSubmit) {
	// 				focusSet = true
	// 				setFocus()
	// 			}
	// 			if (!focusSet && options.beforeSubmit && current.onBeforeSubmit)
	// 				await current.onBeforeSubmit()
	// 			// console.log('vr', s.validationResults)
	// 			// console.log('validate 2')
	// 			try {
	// 				const prevData = state.data
	// 				await Promise.all(
	// 					(
	// 						Object.entries(current.validators || {}) as [
	// 							keyof I,
	// 							Validator,
	// 						][]
	// 					)
	// 						// eslint-disable-next-line security/detect-object-injection
	// 						.filter(([field, _]) => !state.validationResults[field])
	// 						.map(async ([field, validator]) => {
	// 							// eslint-disable-next-line security/detect-object-injection
	// 							const r = await validator(state.data[field])
	// 							// eslint-disable-next-line security/detect-object-injection
	// 							if (state.data[field] !== prevData[field]) return
	// 							state.validationResults = {
	// 								...state.validationResults,
	// 								[field]: r,
	// 							}
	// 							if (
	// 								r.success === false &&
	// 								options.beforeSubmit &&
	// 								!focusSet
	// 							) {
	// 								if (current.onCancelSubmit) await current.onCancelSubmit()
	// 								focusSet = true
	// 								setFocus()
	// 							}
	// 						}),
	// 				)
	// 				// console.log('validate done')
	// 			} catch (error) {
	// 				await handleError(error)
	// 			}
	// 			return !focusSet && r.isValid ? r.value : null
	// 		} catch (error) {
	// 			await handleError(error)
	// 		}
	// 		return null
	// 	},
	// 	[current, handleError, state, setFocus, schema],
	// )
}
