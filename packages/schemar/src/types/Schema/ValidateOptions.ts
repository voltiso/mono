// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { define } from '@voltiso/util'

import type { ValidationIssue, ValidationIssueSeverity } from '~'

//

export type SchemarSeverity = ValidationIssueSeverity | 'ignore'

export interface GetIssuesOptions {
	/**
	 * What to do, when unknown object property is found?
	 *
	 * - Ignored if have index signatures
	 *
	 * @defaultValue `'error'`
	 */
	onUnknownProperty:
		| SchemarSeverity
		| ((issue: ValidationIssue) => void | undefined | SchemarSeverity)
}

export const defaultGetIssuesOptions = define<GetIssuesOptions>().value({
	onUnknownProperty: 'error' as const,
})

export type DefaultGetIssuesOptions = typeof defaultGetIssuesOptions

//

//

//

export interface ValidateOptions extends GetIssuesOptions {
	/**
	 * Should attempt fix?
	 *
	 * @defaultValue `true`
	 */
	fix: boolean
}

export const defaultValidateOptions = {
	...defaultGetIssuesOptions,
	fix: true as const,
}

export type DefaultValidateOptions = typeof defaultValidateOptions
