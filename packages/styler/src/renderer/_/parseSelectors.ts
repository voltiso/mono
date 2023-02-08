// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface ParseSelectorResult {
	selectors: string[]
	mediaQueries: string[]
}

export function parseSelectors(str: string): ParseSelectorResult {
	if (str.startsWith('@')) {
		return {
			selectors: ['&'],
			mediaQueries: [str],
		}
	} else {
		return {
			selectors: str
				.trim()
				.split(',')
				.map(s => s.trim())
				.map(s =>
					s.includes('&')
						? s
						: s.startsWith(':') || s.startsWith('[')
						? `&${s}`
						: `& ${s}`,
				),

			mediaQueries: [],
		}
	}
}
