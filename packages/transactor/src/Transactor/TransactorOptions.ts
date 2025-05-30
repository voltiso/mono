// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationError, ValidationIssue } from '@voltiso/schemar'
import { define } from '@voltiso/util'

export interface TransactorOptions {
	// module?: FirestoreLikeModule
	// prefix: string

	/**
	 * Require schemas for all documents
	 *
	 * @defaultValue `true`
	 */
	requireSchemas: boolean

	/**
	 * Enable reference counting (for `StrongRef`)
	 *
	 * @defaultValue `true`
	 */
	refCounters: boolean

	/**
	 * Enable logging
	 *
	 * @defaultValue `false`
	 */
	log: boolean

	/**
	 * Is database partial? Partial database assumes some docs may be missing
	 * (like in a local cache)
	 *
	 * @defaultValue `false`
	 */
	partial: boolean

	/**
	 * Throw error on write attempt.
	 *
	 * @defaultValue `false`
	 */
	readOnly: boolean

	/**
	 * Allow raw database document data to include `id` field of any value
	 *
	 * @defaultValue `false`
	 */
	allowIdField: boolean | 'warn'

	/**
	 * Allow raw database document data to include `id` field, but the value must
	 * match document ID
	 *
	 * @defaultValue `false`
	 */
	allowValidIdField: boolean | 'warn'

	/**
	 * Maps to Schemar's `onUnknownProperty`
	 *
	 * - Naming: Db document has fields, Js object has properties
	 *
	 * @defaultValue `'warning'`
	 */
	onUnknownField:
		| 'error'
		| 'warning'
		| 'ignore'
		| ((
				issue: ValidationIssue,
		  ) => 'error' | 'warning' | 'ignore' | undefined | void)

	/**
	 * ⚠️ Can ignore validation errors - do not use!
	 *
	 * - Currently does not have an effect on aggregators' state data
	 *
	 * @defaultValue `'error'`
	 */
	onValidationError:
		| 'error'
		| 'ignore'
		| ((error: ValidationError) => 'error' | 'ignore' | undefined | void)

	/**
	 * General-purpose warning handler (errors are simply thrown, warnings are
	 * reported here)
	 *
	 * - You may want to connect e.g. Sentry logging here
	 *
	 * @defaultValue `console.warn`
	 */
	onWarning: (warning: Error) => void

	/**
	 * Check if you have at least one decorator (useful to verify if decorators
	 * are transpiled properly)
	 *
	 * @defaultValue `true`
	 */
	checkDecorators: boolean | 'warn'

	/**
	 * This is dangerous, because it requires Async Context and some libraries
	 * might potentially break it?
	 *
	 * @defaultValue `'warn'`
	 */
	allowConcurrentTransactions: boolean | 'warn'
}

export const defaultTransactorOptions = define<TransactorOptions>().value({
	requireSchemas: true,
	refCounters: true,
	log: false,
	partial: false,
	readOnly: false,

	allowIdField: false,
	allowValidIdField: false,

	onUnknownField: 'warning',
	onValidationError: 'error',

	// eslint-disable-next-line no-console
	onWarning: console.warn,

	checkDecorators: true,
	allowConcurrentTransactions: 'warn',
})
