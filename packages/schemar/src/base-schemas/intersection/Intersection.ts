// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { IntersectionImpl } from './_/IntersectionImpl'

export type Intersection<Ts extends t.$$Schemable[]> = t.Intersection<Ts>

export const Intersection = lazyConstructor(
	() => IntersectionImpl,
) as unknown as t.IntersectionConstructor

//

export function and<Ts extends t.$$Schemable[]>(
	...types: Ts
): Intersection<Ts> {
	let ts = [] as t.$$Schemable[]

	for (const type of types) {
		if (t.isIntersection(type)) ts = [...ts, ...type.getSchemas]
		else ts.push(type)
	}

	// $assert(ts.length >= 2)
	return new Intersection(ts as never) as never
}
