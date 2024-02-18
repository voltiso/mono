// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { Schema, Schema$ } from '~'

export interface IBoolean extends Schema<boolean> {
	readonly [SCHEMA_NAME]: 'Boolean'
}

export interface IBoolean$ extends Schema$<boolean> {
	readonly [SCHEMA_NAME]: 'Boolean'
}
