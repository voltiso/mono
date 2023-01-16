// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { $$Schemable, SchemaOptions } from '~'

export interface TupleOptions<T extends readonly unknown[] = readonly unknown[]>
	extends SchemaOptions {
	//
	Output: T
	Input: T

	isReadonlyTuple: boolean

	shape: $$Schemable[]
	hasRest: boolean
	rest: $$Schemable | undefined
}

//

export declare namespace TupleOptions {
	export interface Default extends SchemaOptions.Default {
		//
		Output: readonly unknown[]
		Input: readonly unknown[]

		isReadonlyTuple: false
		// shape: $$Schemable[]
	}

	export type DefaultMutable = $Override_<Default, { isReadonlyTuple: false }>
	export type DefaultReadonly = $Override_<Default, { isReadonlyTuple: true }>
}
