// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined } from '@voltiso/util'

import { TransactorError } from '~/error'

export class Options_ {
	// module?: FirestoreLikeModule
	// prefix: string

	/**
	 * Require schemas for all documents
	 *
	 * @defaultValue `true`
	 */
	requireSchemas: boolean
	// validateOptions: AsyncValidationOptions

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
	 * Create a mutable Options object, default all not provided values
	 *
	 * @param o - Partial options - others will be defaulted
	 */
	constructor(o: Partial<Options_>) {
		const {
			requireSchemas,
			refCounters,
			log,
			partial,
			readOnly,
			allowIdField,
			allowValidIdField,
			...rest
		} = o
		const unknownKeys = Object.keys(rest)

		if (unknownKeys.length > 0)
			throw new TransactorError(`unknown options: ${unknownKeys.join(',')}`)

		// if (databaseStaticContext) this.module = databaseStaticContext
		// if (databaseStaticContext !== undefined) this.databaseStaticContext = databaseStaticContext
		// else {
		// 	console.log('REQUIRE')
		// 	if (firestoreContext === undefined)
		// 		throw new TransactorError(
		// 			'Unable to import `firebase-admin/firestore` - please provide `databaseContext` in the `options` argument'
		// 		)
		// 	this.databaseStaticContext = firestoreContext
		// }
		// $assert(!!this.databaseStaticContext.FieldValue)
		// $assert(!!this.databaseStaticContext.Timestamp)

		// this.prefix = prefix || ''
		this.requireSchemas = isDefined(requireSchemas) ? requireSchemas : true
		this.refCounters = isDefined(refCounters) ? refCounters : true
		// this.validateOptions = { presence: 'required', ...validateOptions }
		this.log = isDefined(log) ? log : false
		this.partial = isDefined(partial) ? partial : false
		this.readOnly = isDefined(readOnly) ? readOnly : false

		this.allowIdField = isDefined(allowIdField) ? allowIdField : false
		this.allowValidIdField = isDefined(allowValidIdField)
			? allowValidIdField
			: false
	}
}

export type Options = Partial<Options_>
