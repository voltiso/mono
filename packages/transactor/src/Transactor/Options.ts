// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined } from '@voltiso/util'

export class Options_ {
	// module?: FirestoreLikeModule
	// prefix: string
	requireSchemas: boolean
	// validateOptions: AsyncValidationOptions
	refCounters: boolean

	/**
	 * Create a mutable Options object, default all not provided values
	 *
	 * @param o - Partial options - others will be defaulted
	 */
	constructor(o: Partial<Options_>) {
		const { requireSchemas, refCounters, ...rest } = o
		const unknownKeys = Object.keys(rest)

		if (unknownKeys.length > 0)
			throw new Error(`unknown options: ${unknownKeys.join(',')}`)

		// if (databaseStaticContext) this.module = databaseStaticContext
		// if (databaseStaticContext !== undefined) this.databaseStaticContext = databaseStaticContext
		// else {
		// 	console.log('REQUIRE')
		// 	if (firestoreContext === undefined)
		// 		throw new Error(
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
	}
}

export type Options = Partial<Options_>
