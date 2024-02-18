// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UndefinedFromOptional } from '~/object'
import { define } from '~/type'

import { tryParseCodeLocation } from './parseCodeLocation'

export interface StackTraceEntry
	extends UndefinedFromOptional<{
		functionName: string

		path?: string
		fileName?: string
		line?: number
		column?: number
	}> {}

export function parseStackTrace(stackStr: string): StackTraceEntry[] {
	const entries = stackStr
		.split('\n')
		.map(
			line =>
				/at (?<functionName>(?:new )?[^ ]*) [^(]*\((?<location>[^)]*)\)/u.exec(
					line,
				)?.groups as
					| {
							functionName: string
							location: string
					  }
					| undefined,
		)
		.filter((entry): entry is typeof entry & object => !!entry)
		.map(({ functionName, location }) => {
			const parsed = tryParseCodeLocation(location)

			return define<StackTraceEntry>().value({
				functionName,
				...parsed,
			})
		})

	return entries
}
