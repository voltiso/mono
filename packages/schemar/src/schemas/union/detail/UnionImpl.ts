// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast2 } from '@voltiso/util'

import type { GetType_, Schemable } from '~'
import { CustomUnionImpl, defaultUnionOptions } from '~'

export class UnionImpl<T extends AtLeast2<Schemable>> extends CustomUnionImpl<{
	schemas: T
	Output: GetType_<T[number], { kind: 'out' }>
	Input: GetType_<T[number], { kind: 'in' }>
}> {
	constructor(schemas: T) {
		super({ ...defaultUnionOptions, schemas } as never)
	}
}
