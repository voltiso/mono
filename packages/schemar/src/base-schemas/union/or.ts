// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { $$Schemable } from '~'
import { isUnionSchema } from '~'

import { Union$ } from './Union'

export const or = lazyValue(
	() =>
		// eslint-disable-next-line unicorn/consistent-function-scoping
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
