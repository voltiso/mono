// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema } from '~'

export interface IBigint extends ISchema {
	readonly [SCHEMA_NAME]: 'Bigint'

	get getMin(): bigint | undefined
	get getMax(): bigint | undefined
}

export function isBigintSchema(x: unknown): x is IBigint {
	return (x as IBigint | null)?.[SCHEMA_NAME] === 'Bigint'
}
