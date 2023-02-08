// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import { $assert, isPlainObject } from '@voltiso/util'

import type { CssProp } from '~/_/CssProps'
import { isThemePath } from '~/ThemePath'

export type WithNested = { _: object }

export function isWithNested(x: unknown): x is WithNested {
	return isPlainObject((x as WithNested | null)?._)
}

function isWith0(x: unknown): x is { [0]: unknown } {
	return (
		Boolean(x) &&
		typeof x === 'object' &&
		Object.prototype.hasOwnProperty.call(x, 0)
	)
}

function readPath(obj: object | null, path: string[]): unknown {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	let result = obj as any
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
	for (const key of path) result = result[key]
	return isWith0(result) ? result[0] : result
}

export function prepare<X>(
	x: X,
	params: {
		theme: object | null

		customCss?: object | undefined

		/**
		 * When preparing props, only do relatively safe operations - do not remove
		 * `undefined` entries, or flatten `_` (nested)
		 *
		 * @defaultValue `false`
		 */
		isPreparingProps?: boolean | undefined
	},
): X {
	// console.log('prepare', x, customCss)
	if (isPlainObject(x)) {
		let r: object = {}

		if (!params.isPreparingProps && isWithNested(x))
			r = { ...prepare(x._, params) }

		for (const [k, v] of Object.entries(x)) {
			/** Unsafe - do not do when preparing props */
			if (!params.isPreparingProps && k === '_') continue

			/** Unsafe - do not do when preparing props */
			if (!params.isPreparingProps && v === undefined) {
				// removing undefined entry
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

				if (typeof customCssEntry === 'function' || Boolean(v)) {
					let cssValues =
						typeof customCssEntry === 'function'
							? (customCssEntry(v) as object)
							: customCssEntry

					cssValues = { ...cssValues }
					$assert(typeof cssValues === 'object')
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
					delete (cssValues as any)[k]

					const preparedCustomCss = prepare(cssValues, params)

					r = { ...preparedCustomCss, ...r }
				}
			} else {
				const newValue = prepare(v, params) as never
				r[k as keyof typeof r] = newValue
			}
		}

		return r as never
	}

	if (isThemePath(x)) {
		return prepare(readPath(params.theme, x.path as never), params) as any
	}

	if (typeof x === 'string') {
		// eslint-disable-next-line unicorn/no-negated-condition
		if (!x.includes('${')) return x
		// if (!x.includes('$__STYLER__{')) return x
		else {
			// replace all
			return x.replace(
				/\$\{([^}]*)\}/gu,
				// /\$__STYLER__\{([^}]*)\}/gu,
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
