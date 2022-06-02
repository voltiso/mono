/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
// export type OmitForever<T, K extends keyof T> = {
// 	[P in keyof T]: P extends K ? never : T[P]
// }

import { AlsoAccept } from '../../../AlsoAccept'

export type VOmit_<T, K> = T extends object
	? {
			[k in keyof T as k extends K ? never : k]: T[k]
	  }
	: never

export type VOmit<
	T extends object,
	K extends keyof T | AlsoAccept<keyof any>
> = VOmit_<T, K>

export function omit<T extends object, K extends keyof T>(
	obj: T,
	keys: K | K[]
): VOmit<T, K> {
	const { ...r } = obj
	if (!Array.isArray(keys)) keys = [keys]
	for (const key of keys) delete r[key]
	return r as unknown as VOmit<T, K>
}

export function omitIfPresent<
	T extends object,
	K extends keyof T | string | number | symbol
>(obj: T, keys: K | K[]): VOmit<T, K & keyof T> {
	const { ...r } = obj
	if (!Array.isArray(keys)) keys = [keys]
	for (const key of keys) delete r[key as unknown as keyof T]
	return r as unknown as VOmit<T, K & keyof T>
}
