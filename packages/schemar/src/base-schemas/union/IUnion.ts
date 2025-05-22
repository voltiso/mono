// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import { $fastAssert } from '@voltiso/util'

import type { $$Schemable, Schema, Schema$ } from '~'

import type { $$Union } from './CustomUnion'
import type { UnionOptions } from './UnionOptions'

$fastAssert(SCHEMA_NAME)

//

export interface IUnion extends $$Union, Schema {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Union'

	readonly [Voltiso.BASE_OPTIONS]: UnionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnionOptions.Default

	get getSchemas(): $$Schemable[]
}

export interface IUnion$ extends $$Union, Schema$ {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: 'Union'

	readonly [Voltiso.BASE_OPTIONS]: UnionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnionOptions.Default

	get getSchemas(): $$Schemable[]
}

//

export function isUnionSchema(x: unknown): x is IUnion$ {
	return (x as IUnion | null)?.[Voltiso.Schemar.SCHEMA_NAME] === 'Union'
}
