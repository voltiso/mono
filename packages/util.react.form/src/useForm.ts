// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubject } from '@voltiso/observer'
import { createNestedSubject } from '@voltiso/observer'
import type {
	InferableLiteral,
	SchemableObjectLike,
	SchemaLike,
} from '@voltiso/schemar.types'
import type { Path } from '@voltiso/util'
import { deepMapValues, get } from '@voltiso/util'
import { useInitial } from '@voltiso/util.react'
import type { ChangeEvent, FormEvent } from 'react'
import { useMemo } from 'react'

import type { UseForm } from './UseForm-types'

// function _setFocus<S extends SchemableObjectLike>(
// 	mutableState: UseForm.MutableState<S>,
// ) {
// 	for (const input of mutableState.inputs) {
// 		const issues = get(
// 			mutableState.result$,
// 			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
// 			...(input.path as any),
// 		) as ValidationIssue[]
// 		if (issues.length > 0) {
// 			input.element.focus()
// 			if (input.element instanceof HTMLInputElement) {
// 				const position = input.element.value.length
// 				input.element.selectionStart = position
// 				input.element.selectionEnd = position
// 			}
// 			break
// 		}
// 	}
// }

function _register<S extends SchemableObjectLike>(
	mutableState: UseForm.MutableState<S>,
	path: (keyof any)[],
	element: HTMLElement,
) {
	for (const input of mutableState.inputs)
		if (input.path.join('.') === path.join('.')) return

	mutableState.inputs.push({ path, element })
}

function _initializeResult<S extends SchemableObjectLike>(
	options: UseForm.Options<S>,
	mutable: UseForm.MutableState<S>,
): UseForm.RawResult<S> {
	const deepShape = options.data$.schema.getDeepShape

	const fields = deepMapValues(
		deepShape,
		(_value: SchemaLike | InferableLiteral, path) => ({
			props: {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				value: get(options.data$.value, ...(path as any)),

				onChange: (event: ChangeEvent<HTMLInputElement>) => {
					const value = event.target.value

					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					get(options.data$, ...(path as any)).set(value as never)

					const valuePropPath = [
						...path,
						'props',
						'_',
						'value',
					] as unknown as Path<typeof mutable.result$.fields>

					const valueProp$ = get(
						mutable.result$.fields,
						...valuePropPath,
					) as NestedSubject<unknown>

					valueProp$.set(value)
				},

				ref: (instance: HTMLInputElement | null) => {
					if (instance) {
						_register(mutable, path, instance)
					}
				},
			},
		}),
	) as unknown as UseForm.ResultFields<S>

	return {
		props: {
			onSubmit: (event: FormEvent<HTMLFormElement>) => {
				// eslint-disable-next-line no-console
				console.log('onSubmit')

				event.preventDefault()

				// const data = await validate({ beforeSubmit: true })

				// 			if (!data) return
				// 			try {
				// 				await current.onSubmit(data as never)
				// 				storage?.clear()
				// 			} catch (error) {
				// 				await handleError(error)
				// 			}

				void options.onSubmit(options.data$)
			},

			ref: () => {
				mutable.inputs.length = 0
			},
		},

		fields,
	}
}

export const useForm = <S extends SchemableObjectLike>(
	options: UseForm.Options<S>,
): UseForm.Result<S> => {
	const mutable = useInitial<UseForm.MutableState<S>>({
		inputs: [] as never,
		result$: 0 as never,
	})

	mutable.result$ = useMemo(
		() => createNestedSubject(_initializeResult<S>(options, mutable)),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	)

	return mutable.result$

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
