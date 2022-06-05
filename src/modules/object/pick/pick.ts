export function pick<O extends object, K extends keyof O>(
	obj: O,
	key: K
): Pick<O, K>

export function pick<O extends object, K extends keyof O>(
	obj: O,
	keys: K[]
): Pick<O, K>

export function pick<O extends object, K extends keyof O>(
	obj: O,
	keyOrKeys: K | K[]
): Pick<O, K>

export function pick<O extends object, K extends keyof O>(
	obj: O,
	keyOrKeys: K | K[]
): Pick<O, K> {
	const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys]
	const r = {} as Pick<O, K>
	for (const key of keys) r[key] = obj[key]
	return r
}
