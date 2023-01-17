// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type * as s from '~'

describe('IObject', () => {
	it('type', () => {
		$Assert.is<s.Object<{}>, s.IObject>()
		$Assert.is<s.Object<{ a: 1 }>, s.IObject>()

		// ! super-slow vscode support

		// $Assert.is<
		// 	s.CustomObject<{ Output: { a: 1 }; Input: { a: 1 } }>,
		// 	s.CustomObject<{}>
		// >()

		// $Assert.is<
		// 	s.CustomObject<{ Output: { a: 1 }; Input?: { a: 1 } }>,
		// 	s.CustomObject<{}>
		// >()

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

	// eslint-disable-next-line jest/prefer-todo
	it('generic', <_Shape extends s.$$InferableObject>() => {
		// ! super-slow vscode support
		// $Assert.is<s.Object<Shape>, s.ISchema>()
		// $Assert.is<s.Object<Shape>, s.IObject>()
	})
})
