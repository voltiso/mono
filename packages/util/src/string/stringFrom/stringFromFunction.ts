// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable regexp/no-super-linear-move */

import { merge } from '~/object'

import type { StringFromOptions } from './StringFromOptions'
import { defaultToStringOptions } from './StringFromOptions'

/* eslint-disable @typescript-eslint/ban-types */

export function stringFromFunction_(
	f: Function,
	parameters: StringFromOptions,
) {
	let r = f
		.toString()
		.replace(/\s+/gu, ' ')
		.replace(/\(0, [^.]*\.(?<name>[^)]*)\)/gu, '$<name>')
		.replace(/^\s*\((?<arg>[^),]+)\)/u, '$<arg>')
		.replace(/\{\s*\}$/gu, '{}')

	if (r.length > parameters.maxLength) {
		r = r.replace(/\s*\{.*\}\s*/u, '')
		r = r.replace(/\s*=>.*/u, ' => ...')
	}

	return r
}

export function stringFromFunction(
	f: Function,
	parameters?: Partial<StringFromOptions> | undefined,
) {
	const p = merge(defaultToStringOptions, parameters)
	return stringFromFunction_(f, p as never)
}
