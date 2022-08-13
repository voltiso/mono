// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import { isDefined } from '@voltiso/util'

import type { Css } from '~/Css'
import { ThemePath } from '~/ThemePath'

function readPath(o: any, path: string[]): unknown {
	if (!path[0]) {
		if (typeof o !== 'object') return o

		return isDefined(o[0]) ? o[0] : isDefined(o.default) ? o.default : o
	}

	return readPath(o[path[0]], path.slice(1))
}

function isPlain(x: unknown): x is object {
	return (x as object | undefined)?.constructor === Object
}

export function prepare<X>(x: X, theme: object): X {
	if (isPlain(x)) {
		const r: Css = {}

		for (const [k, v] of Object.entries(x)) {
			if (isDefined(v)) r[k as keyof Css] = prepare(v, theme) as never
		}

		return r as any
	}

	if (x instanceof ThemePath) {
		return prepare(readPath(theme, x.path), theme) as any
	}

	if (typeof x === 'string') {
		if (!x.includes('$')) return x
		else
			return x.replace(
				/\$\{([^}]*)\}/gu,
				match =>
					`${prepare(readPath(theme, match.slice(2, -1).split('.')), theme)}`,
			) as any
	}

	return x as any
}
