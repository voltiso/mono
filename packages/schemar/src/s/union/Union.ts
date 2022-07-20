// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type { AtLeast2, Merge2Simple } from '@voltiso/util'
import { lazyValue } from '@voltiso/util'

import type { GetType_ } from '../../GetType'
import type { RootSchemable } from '../../schema'
import type { DefaultUnionOptions } from './_/UnionOptions.js'
import type { CustomUnion } from './CustomUnion.js'
import { isUnion } from './IUnion.js'
import { Union_ } from './Union_.js'

export type Union<Ts extends AtLeast2<RootSchemable>> = CustomUnion<
	Merge2Simple<
		DefaultUnionOptions,
		{
			schemas: Ts
			_out: GetType_<Ts[number], { kind: 'out' }>
			_in: GetType_<Ts[number], { kind: 'in' }>
		}
	>
>

export const Union = Union_ as unknown as UnionConstructor

type UnionConstructor = new <Ts extends AtLeast2<RootSchemable>>(
	schemas: Ts,
) => Union<Ts>

//

function _union<Ts extends AtLeast2<RootSchemable>>(...types: Ts): Union<Ts> {
	let ts = [] as RootSchemable[]

	for (const t of types) {
		if (isUnion(t)) ts = [...ts, ...t.getSchemas]
		else ts.push(t)
	}

	assert(ts.length >= 2)
	return new Union(ts as never) as never
}

export const union = lazyValue(() => _union)
