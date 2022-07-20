// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries, merge } from '../../object'
import { toString } from './toString.js'
import type { ToStringOptions } from './ToStringOptions.js'
import { defaultToStringOptions } from './ToStringOptions.js'

function stringFromProperty(property: keyof any): string {
	if (typeof property === 'symbol') return `[${property.toString()}]`

	return property as string // numbers coerced to strings anyway
}

const baseObjStr = '{ }'

function append(str: string, x: string): string {
	if (str === baseObjStr) return `{ ${x} }`

	return `${str.slice(0, -2)}, ${x} }`
}

export function stringFromObject_(
	obj: Record<keyof any, unknown>,
	parameters: ToStringOptions,
) {
	const entries = getEntries(obj, parameters)

	if (entries.length === 0) return '{}'

	let result = baseObjStr
	let shortResult = '{...}'

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

	const { name } = obj.constructor

	if (['Object'].includes(name)) return result

	return `${name} ${result}`
}

export function stringFromObject(
	f: Record<keyof any, unknown>,
	parameters?: Partial<ToStringOptions> | undefined,
) {
	const p = merge(defaultToStringOptions, parameters)
	return stringFromObject_(f, p)
}
