// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2Simple } from '@voltiso/util'

import type { GetTupleType_ } from '../../GetType'
import type { RootSchemable } from '../../schema'
import type {
	DefaultMutableTupleOptions,
	DefaultReadonlyTupleOptions,
} from './_/TupleOptions.js'
import type { CustomTuple } from './CustomTuple.js'
import { MutableTuple_, ReadonlyTuple_ } from './Tuple_.js'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MutableTuple<T extends RootSchemable[]>
	extends CustomTuple<
		Merge2Simple<
			DefaultMutableTupleOptions,
			{
				elementSchemas: T
				_out: GetTupleType_<T, { kind: 'out'; readonlyTuple: false }>
				_in: GetTupleType_<T, { kind: 'in'; readonlyTuple: false }>
			}
		>
	> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReadonlyTuple<T extends RootSchemable[]>
	extends CustomTuple<
		Merge2Simple<
			DefaultReadonlyTupleOptions,
			{
				elementSchemas: T
				_out: GetTupleType_<T, { kind: 'out'; readonlyTuple: true }>
				_in: GetTupleType_<T, { kind: 'in'; readonlyTuple: true }>
			}
		>
	> {}

//

export const MutableTuple = MutableTuple_ as MutableTupleConstructor
export const ReadonlyTuple = ReadonlyTuple_ as ReadonlyTupleConstructor

//

type MutableTupleConstructor = new <T extends RootSchemable[]>(
	...elementSchemas: T
) => MutableTuple<T>

type ReadonlyTupleConstructor = new <T extends RootSchemable[]>(
	...elementSchemas: T
) => ReadonlyTuple<T>
