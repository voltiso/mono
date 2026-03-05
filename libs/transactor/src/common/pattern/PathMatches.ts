// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getUnknownPathTokens } from './getUnknownPathTokens'

type PathParams = Record<string, string>
type PathArgs = string[]

export interface PathMatches {
	pathParams: PathParams
	pathArgs: PathArgs
}

export type GetPathMatches = (path: string) => PathMatches | null

export const getGetPathMatches = (pattern: string): GetPathMatches => {
	let currentPattern = pattern

	currentPattern = currentPattern.replace(/\*\*/gu, '⚡')
	currentPattern = currentPattern.replace(/\*/gu, '🚀')

	currentPattern = currentPattern.replace(/⚡/gu, '(.*)')
	currentPattern = currentPattern.replace(/🚀/gu, '([^/]*)')

	const params = getUnknownPathTokens(pattern)
	for (const param of params) {
		currentPattern = currentPattern.replace(
			`{${param}}`,
			`(?<${param}>[^\\/]*)`,
		)
	}

	const regex = new RegExp(`^${currentPattern}$`)

	return (path: string): PathMatches | null => {
		const matches = path.match(regex)

		if (matches)
			return {
				pathParams: { ...matches.groups },
				pathArgs: matches.slice(1),
			}
		else return null
	}
}
