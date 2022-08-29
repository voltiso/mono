// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_/symbols'

import type { ISchema } from '~'

export interface IBigint extends ISchema {
	readonly [SCHEMA_NAME]: 'Bigint'

	get getMin(): bigint | undefined
	get getMax(): bigint | undefined
}

export function isBigint(x: unknown): x is IBigint {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IBigint | null)?.[SCHEMA_NAME] === 'Bigint'
}
