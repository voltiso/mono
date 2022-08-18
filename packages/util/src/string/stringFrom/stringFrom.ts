// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isObject, merge } from '~/object'

import { stringFromArray } from './stringFromArray'
import { stringFromFunction_ } from './stringFromFunction'
import { stringFromObject_ } from './stringFromObject'
import type { ToStringOptions } from './ToStringOptions'
import { defaultToStringOptions } from './ToStringOptions'

export interface WithToString {
	toString(): string
}

export function isWithToString(x: unknown): x is WithToString {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const f = (x as WithToString | undefined)?.toString
	return typeof f === 'function' && f !== Object.prototype.toString
}

export function stringFrom_(x: unknown, parameters: ToStringOptions): string {
	if (typeof x === 'string') return `'${x}'`

	if (typeof x === 'bigint') return `${x}n`

	if (typeof x === 'function') return stringFromFunction_(x, parameters)

	if (Array.isArray(x)) return stringFromArray(x, parameters)

	if (x instanceof Date) return x.toISOString()

	if (isWithToString(x)) return x.toString()

	if (isObject(x)) return stringFromObject_(x as never, parameters)

	if (x === null) return 'null'

	if (typeof x === 'undefined') return 'undefined'

	if (x === true) return 'true'

	if (x === false) return 'false'

	throw new Error('toString: unsupported argument type')
}

export function stringFrom(
	x: unknown,
	parameters?: Partial<ToStringOptions> | undefined,
) {
	const p = merge(defaultToStringOptions, parameters)
	let r = stringFrom_(x, p)

	if (r.length > p.maxLength) {
		const dots = '...'
		r = r.slice(0, p.maxLength - dots.length) + dots
	}

	return r
}