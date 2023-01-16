// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { ISchema, ISchema$ } from '~'

export interface IVoid extends ISchema {
	readonly [SCHEMA_NAME]: 'Void'
}

export interface IVoid$ extends ISchema$ {
	readonly [SCHEMA_NAME]: 'Void'
}
