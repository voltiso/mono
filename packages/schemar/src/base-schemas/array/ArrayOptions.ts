// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { $$Schema, SchemaOptions } from '~'

export interface ArrayOptions extends SchemaOptions {
	// Output: readonly unknown[]
	// Input: readonly unknown[]

	/** Currently not type-exposed */
	element: $$Schema

	isReadonlyArray: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

//

export declare namespace ArrayOptions {
	export interface Default extends SchemaOptions.Default {
		//
		Output: readonly unknown[]
		Input: readonly unknown[]

		/** Currently not type-exposed */
		element: $$Schema

		isReadonlyArray: false

		minLength: undefined
		maxLength: undefined
	}

	export type DefaultMutable = $Override_<
		Default,
		{
			isReadonlyArray: false

			Output: unknown[]
			Input: unknown[]
		}
	>

	export type DefaultReadonly = $Override_<Default, { isReadonlyArray: true }>
}
