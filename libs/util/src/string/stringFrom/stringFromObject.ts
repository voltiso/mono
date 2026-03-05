// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '~/object'
import { overrideDefined } from '~/object/Override'
import type { StringFromOptions } from './StringFromOptions'
import { defaultToStringOptions } from './StringFromOptions'
import { stringFrom } from './stringFrom'

function stringFromProperty(property: keyof any): string {
	if (typeof property === 'symbol') return `[${property.toString()}]`

	return property as string // numbers coerced to strings anyway
}

const baseObjStr = '{ }'

function append(str: string, x: string): string {
	if (str.endsWith(baseObjStr)) return `${str.slice(0, -2)} ${x} }`

	return `${str.slice(0, -2)}, ${x} }`
}

/** @public Needs full options (see {@link stringFromObject} for auto-defaulting) */
export function stringFromObject_(
	obj: Record<keyof any, unknown>,
	options: StringFromOptions,
): string {
	let name: string | undefined =
		obj.constructor?.name ||
		(Object.getPrototypeOf(obj) === null ? '[null-proto]' : '[unknown-proto]')

	if (name === 'Object') name = undefined

	const entries = getEntries(obj, options)

	if (entries.length === 0) return name ? `${name} {}` : '{}'

	let result = name ? `${name} ${baseObjStr}` : baseObjStr
	let shortResult = name ? `${name} {...}` : '{...}'

	for (const entry of entries) {
		const [property, value] = entry

		const propertyStr = stringFromProperty(property)

		const cand = append(
			result,
			`${propertyStr}: ${stringFrom(value, {
				...options,
				context: { path: [...options.context.path, obj] },
			})}`,
		)

		const shortCand =
			result === baseObjStr ? shortResult : append(result, '...')

		if (cand.length > options.maxLength) {
			if (shortCand.length > options.maxLength) return shortResult

			return shortCand
		}

		result = cand
		shortResult = shortCand
	}

	return result
}

/** @public */
export function stringFromObject(
	object: Record<keyof any, unknown>,
	options?: Partial<StringFromOptions> | undefined,
): string {
	const finalOptions = overrideDefined(defaultToStringOptions, options)
	return stringFromObject_(object, finalOptions)
}
