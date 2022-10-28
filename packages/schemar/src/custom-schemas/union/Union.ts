// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { UnionImpl } from '~'

export type Union<Ts extends t.$$Schemable[]> = t.Union<Ts>

export const Union = lazyConstructor(
	() => UnionImpl,
) as unknown as t.UnionConstructor

//

export function union<Ts extends t.$$Schemable[]>(...types: Ts): Union<Ts> {
	let ts = [] as t.$$Schemable[]

	for (const type of types) {
		if (t.isUnion(type)) ts = [...ts, ...type.getSchemas]
		else ts.push(type)
	}

	// $assert(ts.length >= 2)
	return new Union(ts as never) as never
}
