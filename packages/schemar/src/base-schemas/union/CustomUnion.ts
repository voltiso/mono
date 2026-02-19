// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema, CustomSchema$ } from '~'

import type { UnionOptions } from './UnionOptions'

export interface $$Union {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Union'
}

export interface CustomUnion<O extends Partial<UnionOptions>>
	extends $$Union, CustomSchema<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Union'

	readonly [Voltiso.BASE_OPTIONS]: UnionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnionOptions.Default

	//

	get getSchemas(): this[Voltiso.OPTIONS]['schemas']
}

export interface CustomUnion$<O extends Partial<UnionOptions>>
	extends $$Union, CustomSchema$<O> {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Union'

	readonly [Voltiso.BASE_OPTIONS]: UnionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnionOptions.Default

	//

	get getSchemas(): this[Voltiso.OPTIONS]['schemas']

	//

	get Final(): CustomUnion<O>
}
