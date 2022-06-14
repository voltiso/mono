export type ReplaceIt<X = unknown> = {
	__replaceIt: X
}

export function replaceIt<X>(x: X): ReplaceIt<X> {
	return {
		__replaceIt: x,
	}
}

export function isReplaceIt(x: unknown): x is ReplaceIt {
	return Boolean((x as ReplaceIt | null)?.__replaceIt)
}
