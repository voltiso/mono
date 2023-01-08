// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomCheck } from '~'
import { ValidationIssue } from '~/meta-schemas'

export function processCustomChecks(
	name: string | undefined,
	checks: readonly CustomCheck[],
	x: unknown,
): ValidationIssue[] {
	const issues = [] as ValidationIssue[]

	for (const c of checks) {
		if (!c.checkIfValid(x)) {
			issues.push(
				new ValidationIssue({
					name,

					expected: {
						description:
							typeof c.expectedDescription === 'function'
								? c.expectedDescription(x as never)
								: c.expectedDescription ||
								  `pass custom check (${c.checkIfValid.toString()})`,
					},

					received: { value: x },
				}),
			)
		}
	}

	return issues
}
