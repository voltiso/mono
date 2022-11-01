// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'
import type { SCHEMA_NAME } from '_'

import type { CustomSchema } from '~/Schema'

import type { DefaultUnionOptions, UnionOptions } from './UnionOptions'

export type $$Union = {
	readonly [SCHEMA_NAME]: 'Union'
}

// export type $CustomUnion<O extends Partial<UnionOptions>> = O extends any
// 	? CustomUnion<O>
// 	: never

export interface CustomUnion<O extends Partial<UnionOptions>>
	extends $$Union,
		CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Union'

	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnionOptions

	//

	get getSchemas(): this[OPTIONS]['schemas']
}
