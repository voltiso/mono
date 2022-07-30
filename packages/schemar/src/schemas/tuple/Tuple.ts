// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomTuple, GetTupleType_, Schemable } from '~'
import { MutableTupleImpl, ReadonlyTupleImpl } from '~'

export interface MutableTuple<T extends Schemable[]>
	extends CustomTuple<{
		elementSchemas: T
		Output: GetTupleType_<T, { kind: 'out'; readonlyTuple: false }>
		Input: GetTupleType_<T, { kind: 'in'; readonlyTuple: false }>
	}> {}

export interface ReadonlyTuple<T extends Schemable[]>
	extends CustomTuple<{
		elementSchemas: T
		Output: GetTupleType_<T, { kind: 'out'; readonlyTuple: true }>
		Input: GetTupleType_<T, { kind: 'in'; readonlyTuple: true }>
		isReadonlyTuple: true
	}> {}

//

export const MutableTuple =
	MutableTupleImpl as unknown as MutableTupleConstructor
export const ReadonlyTuple = ReadonlyTupleImpl as ReadonlyTupleConstructor

//

type MutableTupleConstructor = new <T extends Schemable[]>(
	...elementSchemas: T
) => MutableTuple<T>

type ReadonlyTupleConstructor = new <T extends Schemable[]>(
	...elementSchemas: T
) => ReadonlyTuple<T>
