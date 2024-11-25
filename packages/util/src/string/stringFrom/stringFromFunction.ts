// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sonarjs/regular-expr */
/* eslint-disable regexp/no-super-linear-move */

import { overrideDefined } from '~/object/Override'

import type { StringFromOptions } from './StringFromOptions'
import { defaultToStringOptions } from './StringFromOptions'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function stringFromFunction_(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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
		// eslint-disable-next-line sonarjs/slow-regex
		r = r.replace(/\s*\{.*\}\s*/u, '')
		// eslint-disable-next-line sonarjs/slow-regex
		r = r.replace(/\s*=>.*/u, ' => ...')
	}

	return r
}

export function stringFromFunction(
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	f: Function,
	options?: Partial<StringFromOptions> | undefined,
): string {
	const finalOptions = overrideDefined(defaultToStringOptions, options)
	return stringFromFunction_(f, finalOptions)
}
