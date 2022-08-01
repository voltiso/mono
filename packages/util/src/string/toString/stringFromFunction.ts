// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable regexp/no-super-linear-move */

import { merge } from '~/object'

import type { ToStringOptions } from './ToStringOptions'
import { defaultToStringOptions } from './ToStringOptions'

/* eslint-disable @typescript-eslint/ban-types */

export function stringFromFunction_(f: Function, parameters: ToStringOptions) {
	let r = f
		.toString()
		.replaceAll(/\s+/gu, ' ')
		.replaceAll(/\(0, [^.]*\.(?<name>[^)]*)\)/gu, '$<name>')
		.replace(/^\s*\((?<arg>[^),]+)\)/u, '$<arg>')
		.replaceAll(/\{\s*\}$/gu, '{}')

	if (r.length > parameters.maxLength) {
		r = r.replace(/\s*\{.*\}\s*/u, '')
		r = r.replace(/\s*=>.*/u, ' => ...')
	}

	return r
}

export function stringFromFunction(
	f: Function,
	parameters?: Partial<ToStringOptions> | undefined,
) {
	const p = merge(defaultToStringOptions, parameters)
	return stringFromFunction_(f, p as never)
}
