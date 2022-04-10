/* eslint-disable no-param-reassign */
// export type OmitForever<T, K extends keyof T> = {
// 	[P in keyof T]: P extends K ? never : T[P]
// }

export type StrictOmit<T extends object, K extends keyof T> = {
	[k in keyof T as k extends K ? never : k]: T[k]
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K | K[]): StrictOmit<T, K> {
	const { ...r } = obj
	if (!Array.isArray(keys)) keys = [keys]
	for (const key of keys) delete r[key]
	return r as StrictOmit<T, K>
}

export function omitIfPresent<T extends object, K extends keyof T | string | number | symbol>(
	obj: T,
	keys: K | K[]
): StrictOmit<T, K & keyof T> {
	const { ...r } = obj
	if (!Array.isArray(keys)) keys = [keys]
	for (const key of keys) delete r[key as unknown as keyof T]
	return r as StrictOmit<T, K & keyof T>
}

// const x = omit({ a: 123, v: 234 }, 'a')
// const y = omit(x, 'v')
