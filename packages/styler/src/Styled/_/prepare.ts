// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-unsafe-return */
import { $assert } from '@voltiso/assertor'
import { get, isPlainObject } from '@voltiso/util'

import type { CssProp } from '~'
import { ThemePath } from '~/ThemePath'

export type WithNested = { nested: object }

export function isWithNested(x: unknown): x is WithNested {
	return isPlainObject((x as WithNested | null)?.nested)
}

function isWith0(x: unknown): x is { [0]: unknown } {
	return (
		Boolean(x) &&
		typeof x === 'object' &&
		Object.prototype.hasOwnProperty.call(x, 0)
	)
}

function readPath(obj: object, path: string[]): unknown {
	const result = get(obj, path as never)
	return isWith0(result) ? result[0] : result
}

export function prepare<X>(
	x: X,
	params: {
		theme: object

		customCss?: object | undefined

		/**
		 * When preparing props, only do relatively safe operations - do not remove
		 * `undefined` entries, or flatten `nested`
		 *
		 * @defaultValue `false`
		 */
		isPreparingProps?: boolean | undefined
	},
): X {
	// console.log('prepare', x, customCss)
	if (isPlainObject(x)) {
		let r: object = {}
		let haveChange = false

		if (!params.isPreparingProps && isWithNested(x)) {
			r = { ...prepare(x.nested, params) }
			haveChange = true
		}

		for (const [k, v] of Object.entries(x)) {
			/** Unsafe - do not do when preparing props */
			if (!params.isPreparingProps && k === 'nested') continue

			/** Unsafe - do not do when preparing props */
			if (!params.isPreparingProps && v === undefined) {
				haveChange = true // removing undefined entry
				continue
			}

			/** Unsafe - do not do when preparing props */
			if (
				!params.isPreparingProps &&
				params.customCss &&
				k in params.customCss
			) {
				const customCssEntry = params.customCss[
					k as keyof typeof params.customCss
				] as CssProp<unknown, object>

				const cssValues =
					typeof customCssEntry === 'function'
						? (customCssEntry(v) as object)
						: customCssEntry

				if (typeof customCssEntry === 'function' || Boolean(v)) {
					$assert(typeof cssValues === 'object')

					const preparedCustomCss = prepare(cssValues, params)

					r = { ...preparedCustomCss, ...r }
					haveChange = true
				}
			} else {
				const newValue = prepare(v, params) as never
				if (newValue !== v) haveChange = true
				r[k as keyof typeof r] = newValue
			}
		}

		return haveChange ? r : (x as any)
	}

	if (x instanceof ThemePath) {
		return prepare(readPath(params.theme, x.path as never), params) as any
	}

	if (typeof x === 'string') {
		if (!x.includes('$__STYLER__')) return x
		else {
			// replace all
			return x.replace(
				/\$__STYLER__\{([^}]*)\}/gu,
				(_, match: string) =>
					`${prepare(
						readPath(params.theme, match.split('.') as never),
						params,
					)}`,
			) as any
		}
	}

	return x as any
}
