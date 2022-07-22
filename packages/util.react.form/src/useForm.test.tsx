// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line n/file-extension-in-import
import * as s from '@voltiso/schemar/s'

import { useForm } from './useForm'

describe('useForm', () => {
	it('works', () => {
		expect.assertions(0)

		const Component = () => {
			const f = useForm({
				schema: {
					num: s.number,
					str: s.string,
					strArr: s.array(s.string),
					b: s.boolean,
				},

				onSubmit: () => {
					//
				},
			})

			// @ts-expect-error missing `field`
			;() => <f.Text />

			// @ts-expect-error wrong type
			;() => <f.Text field='num' />

			// @ts-expect-error missing `field`
			;() => <f.Checkbox />

			// @ts-expect-error wrong type
			;() => <f.Checkbox field='str' />

			return (
				<>
					<f.Form>
						<f.Text field='str' />
						<f.Checkbox field='b' />
					</f.Form>
				</>
			)
		}

		void Component
		// renderApp(<Component />)
	})
})
