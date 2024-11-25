// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '~/object'
import { overrideDefined } from '~/object/Override'

import { stringFrom } from './stringFrom'
import type { StringFromOptions } from './StringFromOptions'
import { defaultToStringOptions } from './StringFromOptions'

function stringFromProperty(property: keyof any): string {
	if (typeof property === 'symbol') return `[${property.toString()}]`

	return property as string // numbers coerced to strings anyway
}

const baseObjStr = '{ }'

function append(str: string, x: string): string {
	if (str.endsWith(baseObjStr)) return `${str.slice(0, -2)} ${x} }`

	return `${str.slice(0, -2)}, ${x} }`
}

// eslint-disable-next-line sonarjs/cyclomatic-complexity
export function stringFromObject_(
	obj: Record<keyof any, unknown>,
	options: StringFromOptions,
): string {
	let name: string | undefined =
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		obj.constructor?.name ||
		(Object.getPrototypeOf(obj) === null ? '[null-proto]' : '[unknown-proto]')

	// eslint-disable-next-line sonarjs/no-undefined-assignment
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

export function stringFromObject(
	object: Record<keyof any, unknown>,
	options?: Partial<StringFromOptions> | undefined,
): string {
	const finalOptions = overrideDefined(defaultToStringOptions, options)
	return stringFromObject_(object, finalOptions)
}
