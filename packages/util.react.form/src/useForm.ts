// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar.types'
import { forwardRef, useCallback, useEffect, useMemo } from 'react'

import type { UseFormOptions } from './Options'
import type { UseFormResult } from './UseFormResult'
import { useInitial } from '@voltiso/util.react'
import type {
	SchemableObjectLike,
	ValidationIssue,
} from '@voltiso/schemar.types'
import { get } from '@voltiso/util'

// const glo = style('input').prop('type', 'checkbox')

export type UseFormMutableState<S extends SchemableObjectLike> = {
	inputs: {
		path: string[]
		element: HTMLElement
	}[]

	result: UseFormResult<S>
}

function _setFocus<S extends SchemableObjectLike>(
	mutableState: UseFormMutableState<S>,
) {
	for (const input of mutableState.inputs) {
		const issues = get(
			mutableState.result,
			...(input.path as any),
		) as ValidationIssue[]
		if (issues.length > 0) {
			input.element.focus()
			if (input.element instanceof HTMLInputElement) {
				const position = input.element.value.length
				input.element.selectionStart = position
				input.element.selectionEnd = position
			}
			break
		}
	}
}

function _register(
	mutableState: UseFormMutableState<SchemableObjectLike>,
	path: string[],
	element: HTMLElement,
) {
	for (const input of mutableState.inputs)
		if (input.path.join('.') === path.join('.')) return

	mutableState.inputs.push({ path, element })
}

export const injectUseForm =
	(diContext: { schema: s.InferAndSimplifyFunction }) =>
	<S extends s.SchemableObjectLike>(
		options: UseFormOptions<S>,
	): UseFormResult<S> => {
		const mutable = useInitial<UseFormMutableState<S>>(() => ({
			inputs: [],

			result: options.data.schema.map((entry) => ({

			}))
		}))

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

		const result {
			props: {
				ref: () => {
					mutable.inputs.length = 0
				},

				async onSubmit(event: FormEvent<HTMLFormElement>) {
					event.preventDefault()

					const data = await validate({ beforeSubmit: true })

					if (!data) return
					try {
						await current.onSubmit(data as never)
						storage?.clear()
					} catch (error) {
						await handleError(error)
					}
				},
			},
		}
	}
