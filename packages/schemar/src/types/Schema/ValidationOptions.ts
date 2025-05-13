// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationIssue, ValidationIssueSeverity } from '~'

//

export type SchemarSeverity = ValidationIssueSeverity | 'ignore'

export interface ValidationOptions {
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

export declare namespace ValidationOptions {
	export interface Default {
		onUnknownProperty: 'error'
	}
}

export const defaultValidationOptions: ValidationOptions.Default =
	Object.freeze({
		onUnknownProperty: 'error' as const,
	})

//

//

//

// export interface ValidateOptions extends GetIssuesOptions {
// 	/**
// 	 * Should attempt fix?
// 	 *
// 	 * @defaultValue `true`
// 	 */
// 	fix: boolean
// }

// export const defaultValidateOptions = {
// 	...defaultGetIssuesOptions,
// 	fix: true as const,
// }

// export type DefaultValidateOptions = typeof defaultValidateOptions
