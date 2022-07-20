// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'
import type { IStyleExtension } from 'fela'
import type { ImageStyle, ViewStyle } from 'react-native'

import type { Css } from '../../src'
import type { CssCustom } from '../../src/Css.js'

describe('Css (react-native)', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.is<ViewStyle | ImageStyle | CssCustom | IStyleExtension, Css>()
	})
})
