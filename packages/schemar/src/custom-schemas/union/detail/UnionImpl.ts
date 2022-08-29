// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable, Type_ } from '@voltiso/schemar.types'
import type { AtLeast2 } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import { CustomUnionImpl, defaultUnionOptions } from '~'

export class UnionImpl<T extends AtLeast2<Schemable>> extends lazyConstructor(
	() => CustomUnionImpl,
)<{
	schemas: T
	Output: Type_<T[number], { kind: 'out' }>
	Input: Type_<T[number], { kind: 'in' }>
}> {
	constructor(schemas: T) {
		super({ ...defaultUnionOptions, schemas } as never)
	}
}
