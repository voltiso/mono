// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { ISchema } from '~/Schema'
import type { $$Schemable } from '~/Schemable'

import type { $$Union } from './CustomUnion'
import type { DefaultUnionOptions, UnionOptions } from './UnionOptions'

export interface IUnion extends $$Union, ISchema {
	readonly [SCHEMA_NAME]: 'Union'

	readonly [BASE_OPTIONS]: UnionOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnionOptions

	get getSchemas(): $$Schemable[]
}

export function isUnion(x: unknown): x is IUnion {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnion | null)?.[SCHEMA_NAME] === 'Union'
}
