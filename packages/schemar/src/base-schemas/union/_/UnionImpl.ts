// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast2 } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type { Schemable, Type_ } from '~'

import { defaultUnionOptions } from '../defaultUnionOptions'
import { CustomUnionImpl } from './CustomUnionImpl'

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
