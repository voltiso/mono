/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../AlsoAccept'
import { VOmit } from './VOmit'

export function omitIfPresent<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
>(obj: O, key: K): VOmit<O, K & keyof O>

export function omitIfPresent<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
>(obj: O, keys: K[]): VOmit<O, K & keyof O>

export function omitIfPresent<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
>(obj: O, keyOrKeys: K | K[]): VOmit<O, K & keyof O>

export function omitIfPresent<
	O extends object,
	K extends keyof O | AlsoAccept<keyof any>
>(obj: O, keyOrKeys: K | K[]): VOmit<O, K & keyof O> {
	const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys]
	const { ...r } = obj
	for (const key of keys) delete r[key as unknown as keyof O]
	return r as unknown as VOmit<O, K & keyof O>
}
