// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { Schema } from '~'

export interface IInstance extends Schema {
	readonly [SCHEMA_NAME]: 'Instance'

	readonly getConstructor: abstract new (...args: any) => object
}

export function isInstanceSchema(x: unknown): x is IInstance {
	return (x as IInstance | null)?.[SCHEMA_NAME] === 'Instance'
}
