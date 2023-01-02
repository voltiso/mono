// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Mutable } from '@voltiso/util'

import type { $$Schemable } from '~/Schemable'

import type { Rest } from '../Rest'
import type { CustomUnknownTuple } from './CustomUnknownTuple'
import type { GetTuple } from './GetTuple'

// export type TupleShape = $$Schemable[] | [...$$Schemable[], Rest]

export interface MutableUnknownTuple
	extends CustomUnknownTuple<{ isReadonlyTuple: false }> {
	<T extends readonly $$Schemable[]>(...elementTypes: T): GetTuple<
		this,
		$Mutable<T>
	>

	<T extends [...$$Schemable[], Rest]>(...elementTypes: Readonly<T>): GetTuple<
		this,
		T
	>
	
	/**
	 * Helper overload for type inference
	 *
	 * - Will crash at runtime if there's more than 1 `Rest` element at the end
	 */
	<T extends ($$Schemable | Rest)[]>(
		...elementTypes: readonly [...T]
	): GetTuple<this, [...T]>
}

export interface ReadonlyUnknownTuple
	extends CustomUnknownTuple<{
		isReadonlyTuple: true
		Output: readonly unknown[]
		Input: readonly unknown[]
	}> {
	<T extends readonly $$Schemable[]>(...elementTypes: T): GetTuple<this, [...T]>
}

export type MutableUnknownTupleConstructor = new () => MutableUnknownTuple
export type ReadonlyUnknownTupleConstructor = new () => ReadonlyUnknownTuple
