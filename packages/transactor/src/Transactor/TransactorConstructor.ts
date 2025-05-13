// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
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

	// eslint-disable-next-line @typescript-eslint/unified-signatures
	new (options: Partial<TransactorOptions>): Derived

	new (
		database: Database.Database,
		firestoreLikeModule: FirestoreLikeModule,
	): Derived

	new (
		database: Database.Database,
		firestoreLikeModule: FirestoreLikeModule,
		// eslint-disable-next-line @typescript-eslint/unified-signatures
		options: Partial<TransactorOptions>,
	): Derived

	new (
		// eslint-disable-next-line @typescript-eslint/unified-signatures
		...args:
			| []
			| [Partial<TransactorOptions>]
			| [Database.Database, FirestoreLikeModule]
			| [Database.Database, FirestoreLikeModule, Partial<TransactorOptions>]
	): Derived
}
