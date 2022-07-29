// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomCheck } from '~'
import { ValidationIssue } from '~'

export function processCustomChecks(
	checks: readonly CustomCheck[],
	x: unknown,
): ValidationIssue[] {
	const issues = [] as ValidationIssue[]

	for (const c of checks) {
		if (!c.checkIfValid(x)) {
			issues.push(
				new ValidationIssue({
					expectedDescription:
						typeof c.expectedDescription === 'function'
							? c.expectedDescription(x as never)
							: c.expectedDescription ||
							  `pass custom check (${c.checkIfValid.toString()})`,

					received: x,
				}),
			)
		}
	}

	return issues
}
