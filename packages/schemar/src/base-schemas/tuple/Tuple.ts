// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { _TupleTypeImpl, $$Schemable, CustomTuple } from '~'

import { MutableTupleImpl } from './MutableTupleImpl'
import { ReadonlyTupleImpl } from './ReadonlyTupleImpl'

export interface MutableTuple<T extends $$Schemable[]>
	extends CustomTuple<{
		shape: T
		Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: false }>
		Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: false }>
	}> {}

export interface ReadonlyTuple<T extends $$Schemable[]>
	extends CustomTuple<{
		shape: T
		Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: true }>
		Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: true }>
		isReadonlyTuple: true
	}> {}

export type MutableTupleConstructor = new <T extends $$Schemable[]>(
	...shape: T
) => MutableTuple<T>

export type ReadonlyTupleConstructor = new <T extends $$Schemable[]>(
	...shape: T
) => ReadonlyTuple<T>

//

export const MutableTuple: MutableTupleConstructor = lazyConstructor(
	() => MutableTupleImpl,
) as never

export const ReadonlyTuple: ReadonlyTupleConstructor = lazyConstructor(
	() => ReadonlyTupleImpl,
) as never
