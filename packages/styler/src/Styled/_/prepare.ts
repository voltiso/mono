// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import { $assert } from '@voltiso/assertor'
import { isDefined, isPlainObject } from '@voltiso/util'

import type { CssProp } from '~'
import { ThemePath } from '~/ThemePath'

function readPath(o: any, path: string[]): unknown {
	if (!path[0]) {
		if (typeof o !== 'object') return o

		return isDefined(o[0]) ? o[0] : isDefined(o.default) ? o.default : o
	}

	return readPath(o[path[0]], path.slice(1))
}

export type WithNested = { nested: object }

export function isWithNested(x: unknown): x is WithNested {
	return isPlainObject((x as WithNested | null)?.nested)
}

export function prepare<X>(x: X, theme: object, customCss?: object): X {
	if (isPlainObject(x)) {
		let r: object = {}
		let haveChange = false

		if (isWithNested(x)) {
			r = { ...prepare(x.nested, theme, customCss) }
			haveChange = true
		}

		for (const [k, v] of Object.entries(x)) {
			if (k === 'nested') continue

			if (v === undefined) {
				haveChange = true // removing undefined entry
				continue
			}

			if (customCss && k in customCss) {
				const customCssEntry = customCss[
					k as keyof typeof customCss
				] as CssProp<unknown>

				const cssValues =
					typeof customCssEntry === 'function'
						? customCssEntry(v)
						: customCssEntry

				$assert(typeof cssValues === 'object')

				const preparedCustomCss = prepare(cssValues, theme, customCss)

				r = { ...preparedCustomCss, ...r }
				haveChange = true
			} else {
				const newValue = prepare(v, theme) as never
				if (newValue !== v) haveChange = true
				r[k as keyof typeof r] = newValue
			}
		}

		return haveChange ? r : (x as any)
	}

	if (x instanceof ThemePath) {
		return prepare(readPath(theme, x.path), theme) as any
	}

	if (typeof x === 'string') {
		if (!x.includes('$')) return x
		else {
			// replace all
			return x.replace(
				/\$\{([^}]*)\}/gu,
				match =>
					`${prepare(readPath(theme, match.slice(2, -1).split('.')), theme)}`,
			) as any
		}
	}

	return x as any
}
