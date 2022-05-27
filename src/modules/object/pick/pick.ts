/* eslint-disable no-param-reassign */
export function pick<T extends object, K extends keyof T>(
	obj: T,
	keys: K | K[]
): Pick<T, K> {
	const r = <Pick<T, K>>{}
	if (!Array.isArray(keys)) keys = [keys]
	for (const key of keys) r[key] = obj[key]
	return r
}
