/* eslint-disable no-magic-numbers */
import { omitIfPresent } from './omitIfPresent'

describe('omitIfPresent', () => {
	type IProps = {
		[k: string]: unknown
	}

	it('generic', <P extends IProps & { magic: boolean }>() => {
		expect.assertions(0)

		// type T = IProps & { magic: boolean }

		const a = { magic: true } as P
		const b = omitIfPresent(a, 'css')

		void b.magic
	})
})
