// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import type { OmitCall } from '@voltiso/util'

import type { FirestoreLikeModule } from '~/DatabaseContext'

import type { Transactor } from './Transactor'
import type { TransactorOptions } from './TransactorOptions'

export interface TransactorConstructor<
	Derived extends OmitCall<Transactor> = Transactor,
> {
	new (): Derived

	new (options: Partial<TransactorOptions>): Derived

	new (
		database: Database.Database,
		firestoreLikeModule: FirestoreLikeModule,
	): Derived

	new (
		database: Database.Database,
		firestoreLikeModule: FirestoreLikeModule,
		options: Partial<TransactorOptions>,
	): Derived

	new (
		...args:
			| []
			| [Partial<TransactorOptions>]
			| [Database.Database, FirestoreLikeModule]
			| [Database.Database, FirestoreLikeModule, Partial<TransactorOptions>]
	): Derived
}
