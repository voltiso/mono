// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { InferableLiteral, ISchema } from '~'

export interface ILiteral extends ISchema {
	readonly [SCHEMA_NAME]: 'Literal'

	get getValues(): Set<InferableLiteral>
}
