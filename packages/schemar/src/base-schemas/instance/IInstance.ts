// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema } from '~'

export interface IInstance extends ISchema {
	readonly [SCHEMA_NAME]: 'Instance'

	readonly getConstructor: abstract new (...args: any) => object
}

export function isInstanceSchema(x: unknown): x is IInstance {
	return (x as IInstance | null)?.[SCHEMA_NAME] === 'Instance'
}
