// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as customObserver from '@voltiso/observer.custom'
import * as s from '@voltiso/schemar'

const observerDiContext = {
	schema: s.schema,
}

const createNestedSubject = inject(
	customObserver.createNestedSubject,
	observerDiContext,
)

describe('simple', () => {
	it('works', () => {
		expect.hasAssertions()

		const data = createNestedSubject({
			a: {
				b: {
					c: s.number.min(0),
				},
			},
		})
	})
})
