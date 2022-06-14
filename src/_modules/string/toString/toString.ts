/* eslint-disable jest/unbound-method */
/* eslint-disable @typescript-eslint/unbound-method */
import { isObject, merge } from '../../object'
import { stringFromArray } from './stringFromArray'
import { stringFromFunction_ } from './stringFromFunction'
import { stringFromObject_ } from './stringFromObject'
import { defaultToStringParams, ToStringParams } from './ToStringParams'

type WithToString = { toString(): string }

function isWithToString(x: unknown): x is WithToString {
	const f = (x as WithToString | undefined)?.toString
	return typeof f === 'function' && f !== Object.prototype.toString
}

export function toString_(x: unknown, params: ToStringParams): string {
	if (typeof x === 'string') return `'${x}'`
	else if (typeof x === 'bigint') return `${x}n`
	else if (typeof x === 'function') return stringFromFunction_(x, params)
	// else if (typeof x === 'symbol') return `Symbol(${x.toString()})`
	else if (Array.isArray(x)) return stringFromArray(x, params)
	else if (x instanceof Date) return x.toISOString()
	else if (isWithToString(x)) return x.toString()
	else if (isObject(x)) return stringFromObject_(x as never, params)
	else if (x === null) return 'null'
	else if (typeof x === 'undefined') return 'undefined'
	else if (x === true) return 'true'
	else if (x === false) return 'false'
	else throw new Error('toString: unsupported argument type')
}

export function toString(
	x: unknown,
	params?: Partial<ToStringParams> | undefined
) {
	const p = merge(defaultToStringParams, params)
	let r = toString_(x, p)
	if (r.length > p.maxLength) {
		const dots = '...'
		r = r.slice(0, p.maxLength - dots.length) + dots
	}
	return r
}
