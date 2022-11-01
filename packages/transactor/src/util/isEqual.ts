// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { deepEqual } from 'fast-equals'

import { CustomDocRef } from '~/DocRef'

function filter(x: any): unknown {
	if (x instanceof CustomDocRef) return x.toJSON()
	else if (x?.constructor === Object) {
		const r = {} as any

		for (const [k, v] of Object.entries(x)) {
			// eslint-disable-next-line security/detect-object-injection
			r[k] = filter(v)
		}

		return r
	} else return x
}

export function isEqual(a: unknown, b: unknown) {
	return deepEqual(filter(a), filter(b))
}
