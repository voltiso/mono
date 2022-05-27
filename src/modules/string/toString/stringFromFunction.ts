/* eslint-disable @typescript-eslint/ban-types */
import { merge } from '../../object'
import { defaultToStringParams, ToStringParams } from './ToStringParams'

export function stringFromFunction_(f: Function, params: ToStringParams) {
	let r = f
		.toString()
		.replaceAll(/\s+/gu, ' ')
		.replaceAll(/\(0, [^.]*\.(?<name>[^)]*)\)/gu, '$1')

	if (r.length > params.maxLength) {
		r = r.replace(/\s*\{.*\}\s*/u, '')
		r = r.replace(/\s*=>.*/u, ' => ...')
	}

	return r
}

export function stringFromFunction(
	f: Function,
	params?: Partial<ToStringParams> | undefined
) {
	const p = merge(defaultToStringParams, params)
	return stringFromFunction_(f, p)
}
