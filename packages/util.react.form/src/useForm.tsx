// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetInputType, InferableObject } from '@voltiso/schemar'
// eslint-disable-next-line n/file-extension-in-import
import * as s from '@voltiso/schemar/s'
import type { StyledComponent } from '@voltiso/styler'
import { style } from '@voltiso/styler'
import { getKeys, getValues, undef } from '@voltiso/util'
import { LocalStorage, useConst, useCurrent } from '@voltiso/util.react'
import { useStatePatcher } from '@voltiso/util.react.state-patcher'
import type { FormEvent } from 'react'
import { forwardRef, useCallback, useEffect, useMemo } from 'react'

import type {
	OCheckboxSetType,
	OCheckboxType,
	OFormType,
	OTextType,
} from './_/autoInferredTypes'
import type { CheckboxProps } from './_/CheckboxProps'
import type { FieldName } from './_/FieldName'
import { getArrayValues } from './_/getArrayValues'
import { Context } from './Context'
import type { FormProps } from './FormProps'
import type { Options } from './Options'
import type { ValidationResult } from './schemas/validationResult'
import type { TextProps } from './TextProps'
import type { UseFormResult } from './UseFormResult'
import type { ValidationResults } from './ValidationResults'
import type { Validator } from './Validators'

export function useForm<S extends InferableObject>({
	schema: schemable,
	storageKey,
	validators,
	onBeforeSubmit,
	onCancelSubmit,
	onSubmit,
	onError,
	Form = 'form',
	Text = 'input',
	Checkbox = style('input').prop('type', 'checkbox'),
}: Options<S>): UseFormResult<S> {
	type I = GetInputType<S>

	const c = useCurrent({
		onBeforeSubmit,
		onCancelSubmit,
		onSubmit,
		onError,
		validators,
	})

	const schema = useMemo(() => s.schema(schemable), [schemable])

	const storage = useMemo<LocalStorage<Partial<I>> | undefined>(() => {
		if (!storageKey) return undef
		else return new LocalStorage<Partial<I>>(storageKey, {})
	}, [storageKey])

	const defaultValues = useMemo<Partial<I>>(() => {
		if (!storage) return {}
		else return storage.data
	}, [storage])

	const state = useStatePatcher({
		data: defaultValues,
		validationResults: {} as ValidationResults<I>,
	})

	const r = useConst({
		inputs: [] as { name: string; inst: HTMLElement }[],
		// dirty: false,
	})

	useEffect(() => {
		if (!storage) return

		// console.log('save to storage')
		storage.data = state.data
	}, [state.data, storage])

	const setFocus = useCallback(() => {
		// console.log('inputs', r.inputs)
		for (const input of r.inputs)
			if (state.validationResults[input.name]?.success === false) {
				input.inst.focus()

				if (input.inst instanceof HTMLInputElement) {
					const position = input.inst.value.length
					input.inst.selectionStart = position
					input.inst.selectionEnd = position
				}

				break
			}
	}, [r, state])

	const handleError = useCallback(
		async (e: unknown) => {
			if (c.onError && e instanceof Error) await c.onError(e)
			// eslint-disable-next-line no-console
			else console.error('unhandled exotic error', e)
		},
		[c],
	)

	const validate = useCallback(
		// eslint-disable-next-line max-statements, complexity, unicorn/no-object-as-default-parameter, sonarjs/cognitive-complexity
		async (options: { beforeSubmit: boolean } = { beforeSubmit: false }) => {
			try {
				let focusSet = false
				// console.log('validate 1')
				const r = schema.tryValidate(state.data)
				let validationResults: ValidationResults<I> = {}

				if (!r.isValid) {
					for (const issue of r.issues) {
						const { path } = issue
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						let c = validationResults as any

						for (const p of path) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-multi-assign, security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
							c = c[p] = c[p] || {}
						}

						const r = c as ValidationResult
						const issues = r.issues || []
						issues.push({
							message: issue.toString(),
						})
						r.success = false
						r.issues = issues
					}
					// console.log({ validationResults })
				}

				validationResults = {
					...state.validationResults,
					...validationResults,
				}

				for (const k of getKeys(state.data)) {
					// eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
					if (!validationResults[k] && !(c.validators || ({} as any))[k]) {
						// eslint-disable-next-line security/detect-object-injection
						validationResults[k] = { success: true }
					}
				}

				state.validationResults = validationResults

				let haveErrors = false

				for (const r of getValues(state.validationResults)) {
					if (r?.success === false) haveErrors = true
				}

				if (haveErrors && options.beforeSubmit) {
					focusSet = true
					setFocus()
				}

				if (!focusSet && options.beforeSubmit && c.onBeforeSubmit)
					await c.onBeforeSubmit()

				// console.log('vr', s.validationResults)

				// console.log('validate 2')
				try {
					const prevData = state.data
					await Promise.all(
						(Object.entries(c.validators || {}) as [keyof I, Validator][])

							// eslint-disable-next-line security/detect-object-injection
							.filter(([field, _]) => !state.validationResults[field])
							.map(async ([field, validator]) => {
								// eslint-disable-next-line security/detect-object-injection
								const r = await validator(state.data[field])

								// eslint-disable-next-line security/detect-object-injection
								if (state.data[field] !== prevData[field]) return

								state.validationResults = {
									...state.validationResults,
									[field]: r,
								}

								if (r.success === false && options.beforeSubmit && !focusSet) {
									if (c.onCancelSubmit) await c.onCancelSubmit()

									focusSet = true
									setFocus()
								}
							}),
					)
					// console.log('validate done')
				} catch (error) {
					await handleError(error)
				}

				return !focusSet && r.isValid ? r.value : null
			} catch (error) {
				await handleError(error)
			}
			return null
		},
		[c, handleError, state, setFocus, schema],
	)

	const register = useCallback(
		(name: keyof I & string, inst: HTMLElement) => {
			for (const input of r.inputs) if (input.name === name) return

			r.inputs.push({ name, inst })
		},
		[r],
	)

	useEffect(() => {
		// if (!r.dirty) return
		void validate()
	}, [state.data, validate])

	const StyledForm = useMemo(() => {
		const C = forwardRef<HTMLFormElement, FormProps>((p, ref) => {
			const { children, ...props } = p
			return (
				<Form
					ref={ref}
					{...props}
				>
					<Context.Provider value={state.validationResults}>
						{children}
					</Context.Provider>
				</Form>
			)
		})
		C.displayName = 'Form'
		return style(C)
	}, [Form, state]) as StyledComponent<FormProps>

	const StyledText = useMemo(
		() => style(Text),
		[Text],
	) as StyledComponent<TextProps>

	const StyledCheckbox = useMemo(
		() => style(Checkbox),
		[Checkbox],
	) as StyledComponent<CheckboxProps>

	const OForm: OFormType = useMemo(
		() =>
			StyledForm.props({
				ref: () => {
					r.inputs.length = 0
				},

				async onSubmit(event: FormEvent<HTMLFormElement>) {
					event.preventDefault()

					const data = await validate({ beforeSubmit: true })

					if (!data) return

					try {
						await c.onSubmit(data as never)
						storage?.clear()
					} catch (error) {
						await handleError(error)
					}
				},
			}),
		[StyledForm, c, handleError, r.inputs, storage, validate],
	)

	const OText: OTextType<S> = useMemo(
		() =>
			StyledText.newRequiredProp(
				'field',
				0 as unknown as FieldName<I, string>,
			).mapProps(p => ({
				id: p.field as string,

				ref: (inst: HTMLInputElement | null) => {
					if (inst) register(p.field as never, inst)
				},

				value: (state.data[p.field] || '') as string,

				onChange: e => {
					if (state.validationResults[p.field]) {
						const vr = { ...state.validationResults }
						delete vr[p.field]
						state.validationResults = vr
					}

					state.data = {
						...state.data,
						[p.field]: e.target.value,
					}
				},
				// validationResult: s.validationResults[p.field],
			})),
		[StyledText, register, state],
	)

	const OCheckbox: OCheckboxType<S> = useMemo(
		() =>
			StyledCheckbox.newRequiredProp(
				'field',
				0 as unknown as FieldName<I, boolean>,
			).mapProps(p => ({
				id: p.field as string,

				ref: (inst: HTMLElement | null) => {
					if (inst) register(p.field as never, inst)
				},

				value: state.data[p.field],

				onChange: e => {
					if (state.validationResults[p.field]) {
						const vr = { ...state.validationResults }
						delete vr[p.field]
						state.validationResults = vr
					}

					state.data = {
						...state.data,
						[p.field]: e.target.checked,
					}
				},
				// validationResult: s.validationResults[p.field],
			})),
		[StyledCheckbox, register, state],
	)

	const OCheckboxSet = useMemo(() => {
		const CheckboxSet: OCheckboxSetType<S> = p => {
			const values = useMemo(
				() => getArrayValues(schema, p.field as never),
				[p.field],
			)
			return (
				<>
					{values.map(value => (
						// @ts-expect-error TODO
						<OCheckbox
							key={value as never} //! TODO?
							field={p.field}
						/>
					))}
				</>
			)
		}
		return CheckboxSet
	}, [OCheckbox, schema])

	return useMemo(
		() => ({
			Form: OForm,
			Text: OText,
			Checkbox: OCheckbox,
			CheckboxSet: OCheckboxSet,
		}),
		[OCheckbox, OCheckboxSet, OForm, OText],
	)
}
