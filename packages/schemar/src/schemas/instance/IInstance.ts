// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '~'
import { SCHEMA_NAME } from '~'

export interface IInstance extends ISchema {
	readonly [SCHEMA_NAME]: 'Instance'

	readonly getConstructor: abstract new (...args: any[]) => object
}

export function isInstance(x: unknown): x is IInstance {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IInstance | null)?.[SCHEMA_NAME] === 'Instance'
}
