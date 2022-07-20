// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast2 } from '@voltiso/util'

import type { ISchema, RootSchemable } from '../../schema'
import type { UnionOptions } from './_/UnionOptions.js'

export const IS_UNION = Symbol('IS_UNION')
export type IS_UNION = typeof IS_UNION

export interface IUnion<O extends UnionOptions = UnionOptions>
	extends ISchema<O> {
	readonly [IS_UNION]: true

	get getSchemas(): [...AtLeast2<RootSchemable>]
}

export function isUnion(x: unknown): x is IUnion {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IUnion | null)?.[IS_UNION])
}
