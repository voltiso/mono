// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { render } from '@testing-library/react'
import { injectCreateNestedSubject } from '@voltiso/observer'
import { ValidationIssue } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { sleep } from '@voltiso/util'
import { ReplaySubject } from 'rxjs'

import { injectUseForm } from './useForm'

const useForm = injectUseForm({schema: s.schema})
const createNestedSubject = injectCreateNestedSubject({ schema: s.schema })

describe('useForm', () => {
	it('works', () => {
		expect.assertions(0)

		const appState = createNestedSubject({
			schemable: {
				formData: {
				name: s.string.maxLength(5),
				num: s.number,
				strArr: s.array(s.string),
				isCustomer: s.boolean,
				},

				formState: useForm.stateSchema.optional
			},

			initialValue: {
				formData: {
				num: 123,
				name: 'test',
				strArr: ['a', 'b'],
				isCustomer: true,
				}
			},
		})

		const Component = () => {
			const form = useForm({
				data: appState.formData,
				state: appState.formState,

				validators: {
					name: async (value: string) => {
						const subject = new ReplaySubject<ValidationIssue>()

						async function run() {
							// no sleep - push issue synchronously before subject is listened on
							if (value.toLowerCase() !== value)
								subject.next(
									new ValidationIssue({
										received: value,
										expectedDescription: 'be lowercase',
									}),
								)

							await sleep(500)

							if (value === 'bad')
								subject.next(
									new ValidationIssue({
										received: value,
										expectedDescription: 'not `bad`',
									}),
								)

							await sleep(500)

							subject.complete()
						}

						void run()
						return subject
					},
				},

				onSubmit: () => {
					//
				},
			})

			return (
				<>
					<form {...form.props}>
						<input {...form.name} />

						<input {...form.isCustomer} />
					</form>
				</>
			)
		}

		renderApp(<Component />)
	})
})
