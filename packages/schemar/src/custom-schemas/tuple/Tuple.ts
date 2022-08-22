// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { _TupleTypeImpl, CustomTuple, SchemableLike } from '~'
import { MutableTupleImpl, ReadonlyTupleImpl } from '~'

export interface MutableTuple<T extends SchemableLike[]>
	extends CustomTuple<{
		shape: T
		Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: false }>
		Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: false }>
	}> {}

export interface ReadonlyTuple<T extends SchemableLike[]>
	extends CustomTuple<{
		shape: T
		Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: true }>
		Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: true }>
		isReadonlyTuple: true
	}> {}

//

export const MutableTuple = lazyConstructor(
	() => MutableTupleImpl,
) as unknown as MutableTupleConstructor

export const ReadonlyTuple = lazyConstructor(
	() => ReadonlyTupleImpl,
) as ReadonlyTupleConstructor

//

type MutableTupleConstructor = new <T extends SchemableLike[]>(
	...shape: T
) => MutableTuple<T>

type ReadonlyTupleConstructor = new <T extends SchemableLike[]>(
	...shape: T
) => ReadonlyTuple<T>
