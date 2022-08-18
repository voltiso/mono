// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import { lazyConstructor } from '@voltiso/util'

import type { CustomUnion, GetType_, Schemable_ } from '~'
import { isUnion, UnionImpl } from '~'

export type Union<Ts extends Schemable_[]> = CustomUnion<{
	schemas: Ts
	Output: GetType_<Ts[number], { kind: 'out' }>
	Input: GetType_<Ts[number], { kind: 'in' }>
}>

export const Union = lazyConstructor(
	() => UnionImpl,
) as unknown as UnionConstructor

type UnionConstructor = new <Ts extends Schemable_[]>(schemas: Ts) => Union<Ts>

//

export function union<Ts extends Schemable_[]>(...types: Ts): Union<Ts> {
	let ts = [] as Schemable_[]

	for (const t of types) {
		if (isUnion(t)) ts = [...ts, ...t.getSchemas]
		else ts.push(t)
	}

	$assert(ts.length >= 2)
	return new Union(ts as never) as never
}
