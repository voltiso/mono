// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type * as s from '~'

describe('IObject', () => {
	it('type', () => {
		$Assert.is<s.Object<{}>, s.IObject>()
		$Assert.is<s.Object<{ a: 1 }>, s.IObject>()

		// $Assert.is<s.IObject, s.Object<{}>>()
	})

	it('generic', <Shape extends s.$$InferableObject>() => {
		$Assert.is<s.Object<Shape>, s.ISchema>()
		$Assert.is<s.Object<Shape>, s.IObject>()
		// $Assert.is<s.Object<Shape>, s.IObject>()
	})
})
