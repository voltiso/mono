// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { lazyConstructor } from '@voltiso/util'

import type { CustomUnion, SchemableLike, Type_ } from '~'
import { isUnion, UnionImpl } from '~'

export type Union<Ts extends SchemableLike[]> = CustomUnion<{
	schemas: Ts
	Output: Type_<Ts[number], { kind: 'out' }>
	Input: Type_<Ts[number], { kind: 'in' }>
}>

export const Union = lazyConstructor(
	() => UnionImpl,
) as unknown as UnionConstructor

type UnionConstructor = new <Ts extends SchemableLike[]>(
	schemas: Ts,
) => Union<Ts>

//

export function union<Ts extends SchemableLike[]>(...types: Ts): Union<Ts> {
	let ts = [] as SchemableLike[]

	for (const t of types) {
		if (isUnion(t)) ts = [...ts, ...t.getSchemas]
		else ts.push(t)
	}

	$assert(ts.length >= 2)
	return new Union(ts as never) as never
}
