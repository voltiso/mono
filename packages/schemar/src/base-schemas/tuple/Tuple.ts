// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { _TupleTypeImpl, $$Schemable, CustomTuple, CustomTuple$ } from '~'

import { MutableTupleImpl } from './MutableTupleImpl'
import { ReadonlyTupleImpl } from './ReadonlyTupleImpl'

//

export interface MutableTuple<T extends $$Schemable[]> extends CustomTuple<{
	// shape: T
	Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: false }>
	Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: true }> // allow readonly input
}> {}

export interface MutableTuple$<T extends $$Schemable[]> extends CustomTuple$<{
	// shape: T
	Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: false }>
	Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: true }> // allow readonly input
}> {}

//

export interface ReadonlyTuple<T extends $$Schemable[]> extends CustomTuple<{
	// shape: T
	Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: true }>
	Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: true }>
	isReadonlyTuple: true
}> {}

export interface ReadonlyTuple$<T extends $$Schemable[]> extends CustomTuple$<{
	// shape: T
	Output: _TupleTypeImpl<T, { kind: 'out'; readonlyTuple: true }>
	Input: _TupleTypeImpl<T, { kind: 'in'; readonlyTuple: true }>
	isReadonlyTuple: true
}> {}

//

export type MutableTuple$Constructor = new <T extends $$Schemable[]>(
	...shape: T
) => MutableTuple$<T>

export type ReadonlyTuple$Constructor = new <T extends $$Schemable[]>(
	...shape: T
) => ReadonlyTuple$<T>

//

export const MutableTuple$: MutableTuple$Constructor = lazyConstructor(
	() => MutableTupleImpl,
) as never

export const ReadonlyTuple$: ReadonlyTuple$Constructor = lazyConstructor(
	() => ReadonlyTupleImpl,
) as never
