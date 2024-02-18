// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, OPTIONS } from '@voltiso/util'

import type { CustomSchema, CustomSchema$, SCHEMA_NAME } from '~'

import type { UnionOptions } from './UnionOptions'

export type $$Union = {
	readonly [SCHEMA_NAME]: 'Union'
}

export interface CustomUnion<O extends Partial<UnionOptions>>
	extends $$Union,
		CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'Union'

	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: UnionOptions.Default

	//

	get getSchemas(): this[OPTIONS]['schemas']
}

export interface CustomUnion$<O extends Partial<UnionOptions>>
	extends $$Union,
		CustomSchema$<O> {
	readonly [SCHEMA_NAME]: 'Union'

	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: UnionOptions.Default

	//

	get getSchemas(): this[OPTIONS]['schemas']

	//

	get Final(): CustomUnion<O>
}
