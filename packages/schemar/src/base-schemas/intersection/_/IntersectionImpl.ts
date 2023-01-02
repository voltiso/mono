// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable, Type_ } from '@voltiso/schemar.types'
import type { AtLeast2, IntersectionFromUnion } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import { defaultIntersectionOptions } from '../defaultIntersectionOptions'
import { CustomIntersectionImpl } from './CustomIntersectionImpl'

export class IntersectionImpl<
	T extends AtLeast2<Schemable>,
> extends lazyConstructor(() => CustomIntersectionImpl)<{
	schemas: T
	Output: IntersectionFromUnion<Type_<T[number], { kind: 'out' }>>
	Input: IntersectionFromUnion<Type_<T[number], { kind: 'in' }>>
}> {
	constructor(schemas: T) {
		super({ ...defaultIntersectionOptions, schemas } as never)
	}
}
