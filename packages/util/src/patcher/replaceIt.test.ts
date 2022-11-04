// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isReplaceIt } from './replaceIt'

describe('replaceIt', () => {
	it('works', () => {
		expect(isReplaceIt(null)).toBeFalsy()
		expect(isReplaceIt(undefined)).toBeFalsy()
		expect(isReplaceIt(0)).toBeFalsy()
		expect(isReplaceIt({ __replaceIt: 123 })).toBeTruthy()
	})
})
