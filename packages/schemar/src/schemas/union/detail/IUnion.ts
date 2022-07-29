// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast2 } from '@voltiso/util'

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultUnionOptions,
	ISchema,
	Schemable,
	UnionOptions,
} from '~'
import { SCHEMA_NAME } from '~'

export interface IUnion extends ISchema {
	readonly [SCHEMA_NAME]: 'Union'
	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnionOptions

	get getSchemas(): [...AtLeast2<Schemable>]
}

export function isUnion(x: unknown): x is IUnion {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnion | null)?.[SCHEMA_NAME] === 'Union'
}
