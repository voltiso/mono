// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import type { Throw } from '@voltiso/util'

import type { Db } from '~'
import type { CollectionRef } from '~/CollectionRef'
import type { FirestoreLikeModule } from '~/DatabaseContext'
import type { DTI, IDocConstructorNoBuilder } from '~/Doc'

import type { TransactionBody } from './methods'
import { Transactor_ } from './Transactor_'
import type { TransactorConstructor } from './TransactorConstructor'

export interface Transactor extends Db {
	runTransaction<R>(body: TransactionBody<R>): Promise<R>

	register<
		// eslint-disable-next-line etc/no-misused-generics
		Cls extends IDocConstructorNoBuilder & { [DTI]: { tag: 'untagged' } },
	>(
		cls: Cls,
	): Throw<'db.register requires Doc tag'>

	register<Cls extends IDocConstructorNoBuilder>(
		cls: Cls,
	): CollectionRef<InstanceType<Cls>>

	requireSchemas: boolean
	readonly refCounters: boolean

	/**
	 * Lazy-initialize `Transactor`
	 *
	 * @param database - Either Firestore, Localstore, or something compatible
	 * @param firestoreLikeModule - Object containing helpers for the
	 *   Firestore-compatible database (`FieldValue`, `Timestamp`), required for
	 *   anything other than `Firestore` database
	 */
	init(
		database: FirestoreLike.Database,
		firestoreLikeModule: FirestoreLikeModule,
	): void
}

//

export const Transactor = Transactor_ as unknown as TransactorConstructor
