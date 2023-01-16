// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schemable, ISchema, ISchema$ } from '~'

import type { $$Union } from './CustomUnion'
import type { UnionOptions } from './UnionOptions'

//

export interface IUnion extends $$Union, ISchema {
	readonly [SCHEMA_NAME]: 'Union'

	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: UnionOptions.Default

	get getSchemas(): $$Schemable[]
}

export interface IUnion$ extends $$Union, ISchema$ {
	readonly [SCHEMA_NAME]: 'Union'

	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: UnionOptions.Default

	get getSchemas(): $$Schemable[]
}

//

export function isUnionSchema(x: unknown): x is IUnion$ {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnion | null)?.[SCHEMA_NAME] === 'Union'
}
