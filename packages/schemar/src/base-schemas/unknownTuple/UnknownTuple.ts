// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Mutable } from '@voltiso/util'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	$$Schemable,
	CustomUnknownTuple,
	CustomUnknownTuple$,
	GetTuple$_,
	Rest,
} from '~'

import { MutableUnknownTupleImpl } from './MutableUnknownTupleImpl'
import { ReadonlyUnknownTupleImpl } from './ReadonlyUnknownTupleImpl'

//

export interface MutableUnknownTuple
	extends CustomUnknownTuple<{ isReadonlyTuple: false }> {}

export interface MutableUnknownTuple$
	extends CustomUnknownTuple$<{ isReadonlyTuple: false }> {
	<T extends readonly $$Schemable[]>(...elementTypes: T): GetTuple$_<
		this,
		$Mutable<T>
	>

	<T extends [...$$Schemable[], Rest]>(
		...elementTypes: Readonly<T>
	): GetTuple$_<this, T>

	/**
	 * Helper overload for type inference
	 *
	 * - Will crash at runtime if there's more than 1 `Rest` element at the end
	 */
	<T extends ($$Schemable | Rest)[]>(
		...elementTypes: readonly [...T]
	): GetTuple$_<this, [...T]>
}

//

export interface ReadonlyUnknownTuple
	extends CustomUnknownTuple<{
		isReadonlyTuple: true
		Output: readonly unknown[]
		Input: readonly unknown[]
	}> {}

export interface ReadonlyUnknownTuple$
	extends CustomUnknownTuple$<{
		isReadonlyTuple: true
		Output: readonly unknown[]
		Input: readonly unknown[]
	}> {
	<T extends readonly $$Schemable[]>(...elementTypes: T): GetTuple$_<
		this,
		[...T]
	>
}

export type MutableUnknownTuple$Constructor = new () => MutableUnknownTuple$
export type ReadonlyUnknownTuple$Constructor = new () => ReadonlyUnknownTuple$

//

export const MutableUnknownTuple$ = lazyConstructor(
	() => MutableUnknownTupleImpl,
) as unknown as MutableUnknownTuple$Constructor

export const ReadonlyUnknownTuple$ = lazyConstructor(
	() => ReadonlyUnknownTupleImpl,
) as unknown as ReadonlyUnknownTuple$Constructor

//

//

export const readonlyTuple: ReadonlyUnknownTuple$ = lazyValue(
	() => new ReadonlyUnknownTuple$(),
)

export const mutableTuple: MutableUnknownTuple$ = lazyValue(
	() => new MutableUnknownTuple$(),
)

export const tuple: MutableUnknownTuple$ = mutableTuple
