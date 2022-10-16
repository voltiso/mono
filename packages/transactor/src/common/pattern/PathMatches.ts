// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
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

	// eslint-disable-next-line unicorn/prefer-string-replace-all
	currentPattern = currentPattern.replace(/\*\*/gu, '(.*)')

	// eslint-disable-next-line unicorn/prefer-string-replace-all
	currentPattern = currentPattern.replace(/\*/gu, '([^/]*)')

	const params = getUnknownPathTokens(pattern)
	for (const param of params) {
		currentPattern = currentPattern.replace(
			`{${param}}`,
			`(?<${param}>[^\\/]*)`,
		)
	}

	// eslint-disable-next-line security/detect-non-literal-regexp
	const re = new RegExp(`^${currentPattern}$`)

	return (path: string): PathMatches | null => {
		// eslint-disable-next-line regexp/prefer-regexp-exec
		const r = path.match(re)

		if (r)
			return {
				pathParams: { ...r.groups },
				pathArgs: r.slice(1),
			}
		else return null
	}
}
