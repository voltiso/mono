import { isDefined } from '../isDefined'

export function definedOr(a: unknown, b: unknown) {
	return isDefined(a) ? a : b
}
