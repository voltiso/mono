// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isObject } from '~/object/isObject'
import { overrideDefined } from '~/object/Override'

import { stringFromArray } from './stringFromArray'
import { stringFromFunction_ } from './stringFromFunction'
import { stringFromObject_ } from './stringFromObject'
import type { StringFromOptions } from './StringFromOptions'
import { defaultToStringOptions } from './StringFromOptions'

export interface WithToString {
	toString(): string
}

export function isWithToString(x: unknown): x is WithToString {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const f = (x as WithToString | undefined)?.toString
	return typeof f === 'function' && f !== Object.prototype.toString
}

// eslint-disable-next-line sonarjs/cyclomatic-complexity
export function stringFrom_(x: unknown, options: StringFromOptions): string {
	for (const [idx, ancestor] of options.context.path.entries()) {
		if (x === ancestor)
			return `[Circular ^${options.context.path.length - idx}]`
	}

	if (typeof x === 'string') return `'${x}'`

	if (typeof x === 'bigint') return `${x}n`

	if (typeof x === 'function') return stringFromFunction_(x, options)

	if (Array.isArray(x)) return stringFromArray(x, options)

	if (x instanceof Date) return x.toISOString()

	if (isWithToString(x)) return x.toString()

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
	if (isObject(x)) return stringFromObject_(x as never, options)

	if (x === null) return 'null'

	// eslint-disable-next-line unicorn/no-typeof-undefined
	if (typeof x === 'undefined') return 'undefined'

	if (x === true) return 'true'

	if (x === false) return 'false'

	throw new Error('toString: unsupported argument type')
}

export function stringFrom(
	x: unknown,
	options?: Partial<StringFromOptions> | undefined,
): string {
	const p = overrideDefined(defaultToStringOptions, options || {})
	let r = stringFrom_(x, p)

	if (r.length > p.maxLength) {
		const dots = '...'
		r = r.slice(0, p.maxLength - dots.length) + dots
	}

	return r
}
