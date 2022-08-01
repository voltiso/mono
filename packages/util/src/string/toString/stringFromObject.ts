// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { undef } from '~'
import { getEntries, merge } from '~/object'

import { toString } from './toString'
import type { ToStringOptions } from './ToStringOptions'
import { defaultToStringOptions } from './ToStringOptions'

function stringFromProperty(property: keyof any): string {
	if (typeof property === 'symbol') return `[${property.toString()}]`

	return property as string // numbers coerced to strings anyway
}

const baseObjStr = '{ }'

function append(str: string, x: string): string {
	if (str.endsWith(baseObjStr)) return `${str.slice(0, -2)} ${x} }`

	return `${str.slice(0, -2)}, ${x} }`
}

export function stringFromObject_(
	obj: Record<keyof any, unknown>,
	parameters: ToStringOptions,
) {
	let name: string | undefined = obj.constructor.name

	if (name === 'Object') name = undef

	const entries = getEntries(obj, parameters)

	if (entries.length === 0) return name ? `${name} {}` : '{}'

	let result = name ? `${name} ${baseObjStr}` : `${baseObjStr}`
	let shortResult = name ? `${name} {...}` : '{...}'

	for (const entry of entries) {
		const [property, value] = entry

		const propertyStr = stringFromProperty(property)

		const cand = append(result, `${propertyStr}: ${toString(value)}`)
		const shortCand =
			result === baseObjStr ? shortResult : append(result, '...')

		if (cand.length > parameters.maxLength) {
			if (shortCand.length > parameters.maxLength) return shortResult

			return shortCand
		}

		result = cand
		shortResult = shortCand
	}

	return result
}

export function stringFromObject(
	f: Record<keyof any, unknown>,
	parameters?: Partial<ToStringOptions> | undefined,
) {
	const p = merge(defaultToStringOptions, parameters)
	return stringFromObject_(f, p)
}
