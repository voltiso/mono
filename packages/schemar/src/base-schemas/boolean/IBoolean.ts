// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { ISchema, ISchema$ } from '~'

export interface IBoolean extends ISchema<boolean> {
	readonly [SCHEMA_NAME]: 'Boolean'
}

export interface IBoolean$ extends ISchema$<boolean> {
	readonly [SCHEMA_NAME]: 'Boolean'
}
