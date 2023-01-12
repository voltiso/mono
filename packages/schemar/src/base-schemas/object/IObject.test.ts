// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type * as s from '~'

describe('IObject', () => {
	it('type', () => {
		$Assert.is<s.Object<{}>, s.IObject>()
		$Assert.is<s.Object<{ a: 1 }>, s.IObject>()

		$Assert.is<
			s.CustomObject<{ Output: { a: 1 }; Input: { a: 1 } }>,
			s.CustomObject<{}>
		>()

		$Assert.is<
			s.CustomObject<{ Output: { a: 1 }; Input?: { a: 1 } }>,
			s.CustomObject<{}>
		>()

		// /** This is still fast */
		// type GetObject<Shape extends $$InferableObject> = CustomObject<{
		// 	Output: GetObjectOutput<Shape>
		// 	Input: GetObjectInput<Shape>
		// }>

		// /** This is slow */
		// interface MyObject<Shape extends $$InferableObject>
		// 	extends GetObject<Shape> {}

		// $Assert.is<GetObject<{ a: 1 }>, s.CustomObject<{}>>()
		// $Assert.is<MyObject<{ a: 1 }>, s.CustomObject<{}>>()

		// $Assert.is<
		// 	s.CustomObject<{ Output: { a: 1 } }>,
		// 	s.CustomObject<{ Output: { [k: string]: number } }>
		// >()

		// $Assert.is<
		// 	s.Object<{ a: 1 }>,
		// 	s.CustomObject<{ Output: { [k: string]: number } }>
		// >()

		// $Assert.is<
		// 	s.CustomObject<{ Output: { a: 1 } }>,
		// 	s.Object<{ [k: string]: number }>
		// >()
	})

	it('generic', <Shape extends s.$$InferableObject>() => {
		$Assert.is<s.Object<Shape>, s.ISchema>()
		$Assert.is<s.Object<Shape>, s.IObject>()
		// $Assert.is<s.Object<Shape>, s.IObject>()
	})
})
