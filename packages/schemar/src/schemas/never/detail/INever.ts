// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema, SCHEMA_NAME } from '~'

export interface INever extends ISchema {
	readonly [SCHEMA_NAME]: 'Never'

	get OutputType(): never
	get InputType(): never
}
