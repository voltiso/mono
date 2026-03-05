// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { SchemaOptions } from '~'

export interface UnknownTupleOptions extends SchemaOptions {
	// Output: readonly unknown[]
	// Input: readonly unknown[]

	isReadonlyTuple: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

//

export declare namespace UnknownTupleOptions {
	export interface Default extends SchemaOptions.Default {
		Output: unknown[]
		Input: unknown[]

		minLength: undefined
		maxLength: undefined

		isReadonlyTuple: false
	}

	export type DefaultMutable = $Override_<Default, { isReadonlyTuple: false }>
	export type DefaultReadonly = $Override_<Default, { isReadonlyTuple: true }>
}
