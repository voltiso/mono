// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { act, render } from '@testing-library/react'
import { ValidationIssue } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { $fastAssert, sleep } from '@voltiso/util'
import { useObservable } from '@voltiso/util.react.rxjs'
import { CustomSubjectTree } from '@voltiso/util.rxjs'
import { ReplaySubject } from 'rxjs'

import { useForm } from './useForm'
import type { UseForm } from './UseForm-types'

describe('useForm', () => {
	it('works', () => {
		expect.hasAssertions()

		const sFormData = {
			name: s.string.maxLength(5),
			num: s.number,
			strArr: s.array(s.string),
			isCustomer: s.boolean,
		}

		const appState$ = new CustomSubjectTree({
			schema: {
				formData: {
					name: s.string.optional,
					num: s.number,
					strArr: s.array(s.string),
					isCustomer: s.unknown,
				},
			},

			initialValue: {
				formData: {
					num: 123,
					name: 'test',
					strArr: ['a', 'b'],
					isCustomer: true,
				},
			},
		})

		let form$: UseForm.Result<typeof sFormData> | undefined

		const Component = () => {
			form$ = useForm({
				schemable: sFormData,

				data$: appState$.formData$,

				validators: {
					name: async (value: string) => {
						// eslint-disable-next-line rxjs/no-ignored-replay-buffer
						const subject = new ReplaySubject<ValidationIssue>()

						// eslint-disable-next-line sonarjs/no-nested-functions
						async function run() {
							// no sleep - push issue synchronously before subject is listened on
							if (value.toLowerCase() !== value)
								subject.next(
									new ValidationIssue({
										received: { value },

										expected: {
											description: 'be lowercase',
										},
									}),
								)

							await sleep(500)

							if (value === 'bad')
								subject.next(
									new ValidationIssue({
										received: { value },

										expected: {
											description: 'not `bad`',
										},
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

			const formProps = useObservable(form$.props)
			const fields = useObservable(form$.fields)

			return (
				<>
					<form {...formProps}>
						<input {...fields.name.props} />

						<input {...fields.isCustomer.props} />
					</form>
				</>
			)
		}

		render(<Component />)

		$fastAssert(form$)

		expect(form$.fields.name.props.value).toBe('test')

		act(() => {
			$fastAssert(form$)

			form$.fields.name.props.onChange({
				target: { value: 'test2' } as never,
			} as never)
		})

		expect(appState$.formData.name).toBe('test2')
		expect(form$.fields.name.props.value).toBe('test')
	})
})
