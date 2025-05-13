// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { deepEqual } from 'fast-equals'

import { _CustomDocRef } from '~/DocRef'

function filter(x: any): unknown {
	if (x instanceof _CustomDocRef) return x.toJSON()
	else if (x?.constructor === Object) {
		const r = {} as any

		for (const [k, v] of Object.entries(x)) {
			r[k] = filter(v)
		}

		return r
	} else return x
}

export function isEqual(a: unknown, b: unknown): boolean {
	return deepEqual(filter(a), filter(b))
}
