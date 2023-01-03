// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, OPTIONS } from '@voltiso/util'

import type { $$Object, DefineSchema, Input_, ObjectOptions, Output_ } from '~'
import type { $$Schema, ISchema } from '~/Schema/ISchema'

export type SchemarAnd<
	A extends $$Schema,
	B extends $$Schema,
> = SchemarAnd.Impl<A, B>

// export type SchemarAnd<
// 	A extends $$Schemable,
// 	B extends $$Schemable,
// > = A extends any
// 	? B extends any
// 		? SchemarAnd.Impl<InferSchema<A>, InferSchema<B>>
// 		: never
// 	: never

export namespace SchemarAnd {
	export type Impl<A extends $$Schema, B extends $$Schema> = [A, B] extends [
		$$Object,
		$$Object,
	]
		? A extends $$Object
			? B extends $$Object
				? SchemarAnd.Object<A, B>
				: never
			: never
		: SchemarAnd.Custom<A, B>

	export type Object<A extends $$Object, B extends $$Object> = A extends {
		[OPTIONS]: ObjectOptions
	}
		? DefineSchema<
				A,
				{
					shape: _<
						A[OPTIONS]['shape'] &
							(B extends $$Object & { getShape: {} } ? B['getShape'] : B)
					>
					Output: _<A[OPTIONS]['Output'] & Output_<B>>
					Input: _<A[OPTIONS]['Input'] & Input_<B>>
				}
		  >
		: never

	export type Custom<A extends $$Schema, B extends $$Schema> = A extends {
		Output: unknown
		Input: unknown
	}
		? B extends { Output: unknown; Input: unknown }
			? ISchema & {
					Output: A['Output'] & B['Output']
					Input: A['Input'] & B['Input']
			  }
			: never
		: never
}
