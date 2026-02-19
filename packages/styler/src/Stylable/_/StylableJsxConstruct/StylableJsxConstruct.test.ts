// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'
import type { View } from 'react-native'

import type { StylableJsxConstruct } from './AutoStylableJsxConstruct'
import type {
	IStylableJsxConstruct,
	StylableJsxConstructLike,
} from './StylableJsxConstruct'

describe('StylableJsxConstruct', () => {
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('type', () => {
		expect.assertions(0)

		$Assert.is<typeof View, StylableJsxConstructLike>()
		$Assert.is<typeof View, StylableJsxConstruct>()
		$Assert.is<typeof View, IStylableJsxConstruct>()

		$Assert.is<typeof View, StylableJsxConstructLike>()
		$Assert.is<typeof View, StylableJsxConstruct>()
		$Assert.is<typeof View, IStylableJsxConstruct>()

		// $Assert.is<NativeMethods, StylableLike>() // no!
	})
})
