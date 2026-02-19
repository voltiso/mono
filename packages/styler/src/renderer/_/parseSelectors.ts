// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
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
					// eslint-disable-next-line no-nested-ternary
					s.includes('&')
						? s
						: // eslint-disable-next-line sonarjs/no-nested-conditional
							s.startsWith(':') || s.startsWith('[')
							? `&${s}`
							: `& ${s}`,
				),

			mediaQueries: [],
		}
	}
}
