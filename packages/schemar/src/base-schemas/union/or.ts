// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/complexity/useArrowFunction: . */

import { lazyFunction } from '@voltiso/util'

import type { $$Schemable } from '~/types/Schemable/Schemable'

import { isUnionSchema } from './IUnion'
import { Union$ } from './Union'

export const or = lazyFunction(
	() =>
		function <Ts extends $$Schemable[]>(...types: Ts): Union$<Ts> {
			let ts = [] as $$Schemable[]

			for (const type of types) {
				if (isUnionSchema(type)) ts = [...ts, ...type.getSchemas]
				else ts.push(type)
			}

			// $assert(ts.length >= 2)
			return new Union$(ts as never) as never
		},
)

export const union = or
