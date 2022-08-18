// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { CustomTuple, GetTupleTypeImpl_, Schemable_ } from '~'
import { MutableTupleImpl, ReadonlyTupleImpl } from '~'

export interface MutableTuple<T extends Schemable_[]>
	extends CustomTuple<{
		elementSchemas: T
		Output: GetTupleTypeImpl_<T, { kind: 'out'; readonlyTuple: false }>
		Input: GetTupleTypeImpl_<T, { kind: 'in'; readonlyTuple: false }>
	}> {}

export interface ReadonlyTuple<T extends Schemable_[]>
	extends CustomTuple<{
		elementSchemas: T
		Output: GetTupleTypeImpl_<T, { kind: 'out'; readonlyTuple: true }>
		Input: GetTupleTypeImpl_<T, { kind: 'in'; readonlyTuple: true }>
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

type MutableTupleConstructor = new <T extends Schemable_[]>(
	...elementSchemas: T
) => MutableTuple<T>

type ReadonlyTupleConstructor = new <T extends Schemable_[]>(
	...elementSchemas: T
) => ReadonlyTuple<T>
