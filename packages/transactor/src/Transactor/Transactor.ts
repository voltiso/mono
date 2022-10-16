// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'
import type { IsUnion, Throw } from '@voltiso/util'

import type { FirestoreLikeModule } from '~/DatabaseContext'
import type { Db } from '~/Db'
import type { DocConstructorLike, DTI } from '~/Doc'

import type { DbPathFromString } from '..'
import type { TransactionBody } from './methods'
import type { TransactorConstructor } from './TransactorConstructor'
import { TransactorImpl } from './TransactorImpl'

export interface Transactor extends Db {
	runTransaction<R>(body: TransactionBody<R>): Promise<R>

	register<
		// eslint-disable-next-line etc/no-misused-generics
		Cls extends { [DTI]: { tag: 'untagged' } },
	>(
		cls: Cls,
	): Throw<'db.register requires Doc tag'>

	register<Cls extends DocConstructorLike>(
		cls: Cls,
	): IsUnion<Cls[DTI]['tag']> extends true
		? never
		: DbPathFromString<Cls[DTI]['tag'], InstanceType<Cls>> // CollectionRef<InstanceType<Cls>>

	requireSchemas: boolean
	readonly refCounters: boolean
	partial: boolean
	readOnly: boolean

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

export const Transactor = TransactorImpl as unknown as TransactorConstructor

// type A = Split<'asd/sdf', '/'>
