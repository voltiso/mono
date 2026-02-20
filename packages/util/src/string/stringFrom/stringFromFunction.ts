// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { overrideDefined } from '~/object/Override'

import type { StringFromOptions } from './StringFromOptions'
import { defaultToStringOptions } from './StringFromOptions'

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
	options?: Partial<StringFromOptions> | undefined,
): string {
	const finalOptions = overrideDefined(defaultToStringOptions, options)
	return stringFromFunction_(f, finalOptions)
}
