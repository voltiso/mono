// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { renderApp } from '@testing-library/react'
import { injectCreateNestedSubject } from '@voltiso/observer'
import { ValidationIssue } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { sleep } from '@voltiso/util'
import { ReplaySubject } from 'rxjs'

import { useForm } from './useForm'

const createNestedSubject = injectCreateNestedSubject({ schema: s.schema })

describe('useForm', () => {
	it('works', () => {
		expect.assertions(0)

		const data = createNestedSubject({
			schemable: {
				name: s.string.maxLength(5),
				num: s.number,
				strArr: s.array(s.string),
				isCustomer: s.boolean,
			},

			initialValue: {
				num: 123,
				name: 'test',
				strArr: ['a', 'b'],
				isCustomer: true,
			},
		})

		const Component = () => {
			const form = useForm({
				data,

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
