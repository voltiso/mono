// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema, SchemableLike } from '~'

export interface IUnion extends ISchema {
	readonly [SCHEMA_NAME]: 'Union'
	// readonly [BASE_OPTIONS]: UnionOptions
	// readonly [DEFAULT_OPTIONS]: DefaultUnionOptions

	get getSchemas(): SchemableLike[]
}

export function isUnion(x: unknown): x is IUnion {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnion | null)?.[SCHEMA_NAME] === 'Union'
}
