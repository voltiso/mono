// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral, ISchema } from '~'
import { SCHEMA_NAME } from '~'

export interface ILiteral extends ISchema {
	readonly [SCHEMA_NAME]: 'Literal'

	get getValues(): Set<InferableLiteral>
}

export function isLiteral(x: unknown): x is ILiteral {
	// eslint-disable-next-line security/detect-object-injection
	return (x as ILiteral | null)?.[SCHEMA_NAME] === 'Literal'
}
