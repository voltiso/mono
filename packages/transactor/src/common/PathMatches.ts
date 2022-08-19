// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'

type PathParams = Record<string, string>
type PathArgs = string[]

export interface PathMatches {
	pathParams: PathParams
	pathArgs: PathArgs
}

export type GetPathMatches = (path: string) => PathMatches | null

export const getGetPathMatches = (pattern: string): GetPathMatches => {
	const params = [...pattern.matchAll(/\{([^{}]*)\}/gu)].map(r => {
		const res = r[1]
		$assert(typeof res === 'string')
		return res
	})

	let currentPattern = pattern

	currentPattern = currentPattern.replace('**', '(.*)')
	currentPattern = currentPattern.replace('*', '([^/]*)')

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
