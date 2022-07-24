// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import type { OmitCall } from '@voltiso/util'

import type { FirestoreLikeModule } from '../DatabaseContext.js'
import type { Options_, Transactor } from '.'

export interface TransactorConstructor<
	Derived extends OmitCall<Transactor> = Transactor,
> {
	new (): Derived

	new (options: Partial<Options_>): Derived

	new (
		database: Database.Database,
		firestoreLikeModule: FirestoreLikeModule,
	): Derived

	new (
		database: Database.Database,
		firestoreLikeModule: FirestoreLikeModule,
		options: Partial<Options_>,
	): Derived

	new (
		...args:
			| []
			| [Partial<Options_>]
			| [Database.Database, FirestoreLikeModule]
			| [Database.Database, FirestoreLikeModule, Partial<Options_>]
	): Derived
}
