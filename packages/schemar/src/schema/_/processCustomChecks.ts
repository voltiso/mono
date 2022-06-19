import { CustomCheck } from './CustomCheck'
import * as s from '../../s'

export function processCustomChecks(
	checks: readonly CustomCheck[],
	x: unknown
): s.ValidationIssue[] {
	const issues = [] as s.ValidationIssue[]
	for (const c of checks) {
		if (!c.checkIfValid(x)) {
			issues.push(
				new s.ValidationIssue({
					expectedDescription:
						typeof c.expectedDescription === 'function'
							? c.expectedDescription(x as never)
							: c.expectedDescription ||
							  `pass custom check (${c.checkIfValid.toString()})`,
					received: x,
				})
			)
		}
	}
	return issues
}
