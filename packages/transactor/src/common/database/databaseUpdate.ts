// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { isDatabase } from '@voltiso/firestore-like'
import { isDeleteIt, isReplaceIt, stringFrom } from '@voltiso/util'

import type { $WithId } from '~/Data'
import type { DatabaseContext } from '~/DatabaseContext'
import type { AnyDoc } from '~/DocTypes'
import { TransactorError } from '~/error'
import type { IntrinsicFields } from '~/schemas'
import { sVoltisoEntry } from '~/schemas'
import type { WithTransaction } from '~/Transaction'
import type { Transactor } from '~/Transactor'
import type { Updates } from '~/updates/Updates'

import { toDatabaseSet, toDatabaseUpdate } from './toDatabase'

type T = Database.Transaction | Database.Database

function assertInTransaction() {
	const ctxOverride = Zone.current.get('transactionContextOverride') as unknown

	if (!ctxOverride)
		throw new TransactorError(
			'Illegal Database operation: expected to be in transaction',
		)
}

function assertNotInTransaction() {
	const ctxOverride = Zone.current.get('transactionContextOverride') as unknown

	if (ctxOverride)
		throw new TransactorError(
			'Illegal Database operation: expected to NOT be in transaction',
		)
}

const databaseDelete = async (t: T, ref: Database.ServerDocumentReference) => {
	if (isDatabase(t)) {
		assertNotInTransaction()
		await ref.delete()
	} else {
		assertInTransaction()
		t.delete(ref)
	}

	return null
}

const databaseSet = async (
	transactor: Transactor,
	ctx: DatabaseContext,
	t: T,
	ref: Database.ServerDocumentReference,
	data: IntrinsicFields,
): Promise<$WithId<IntrinsicFields, AnyDoc>> => {
	if (transactor.readOnly)
		throw new TransactorError(
			`cannot write to readOnly db - databaseSet(data=${stringFrom(data)})`,
		)

	// assert(data.__voltiso)

	const ctxOverride = Zone.current.get('transactionContextOverride') as
		| WithTransaction
		| undefined

	const now = ctxOverride?.transaction
		? ctxOverride.transaction._date
		: new Date()

	// eslint-disable-next-line no-param-reassign
	data = {
		...data,

		__voltiso: sVoltisoEntry.validate({
			...data.__voltiso,
			createdAt: now,
			updatedAt: now,
		}),
	}

	const firestoreData = toDatabaseSet(ctx, data)

	if (isDatabase(t)) {
		assertNotInTransaction()
		await ref.set(firestoreData)
	} else {
		assertInTransaction()
		t.set(ref, firestoreData)
	}

	return { ...data, id: ref.id as never }
}

export async function databaseUpdate(
	transactor: Transactor,
	ctx: DatabaseContext,
	t: T,
	ref: Database.ServerDocumentReference,
	updates: Updates,
) {
	if (transactor.readOnly)
		throw new TransactorError(
			`cannot write to readOnly db - databaseUpdate(updates=${stringFrom(
				updates,
			)})`,
		)
	// console.log('firestoreUpdate', ref.path, updates)

	if (isReplaceIt(updates)) {
		return databaseSet(transactor, ctx, t, ref, updates.__replaceIt as never)
	}

	if (isDeleteIt(updates)) return databaseDelete(t, ref)

	const ctxOverride = Zone.current.get('transactionContextOverride') as
		| WithTransaction
		| undefined

	const now = ctxOverride?.transaction
		? ctxOverride.transaction._date
		: new Date()

	// eslint-disable-next-line no-param-reassign
	updates = {
		...updates,

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		__voltiso: {
			...(updates['__voltiso'] as any),
			updatedAt: now,
		},
	}

	const databaseUpdates = toDatabaseUpdate(ctx, updates)

	if (isDatabase(t)) {
		assertNotInTransaction()
		await ref.update(databaseUpdates)
	} else {
		assertInTransaction()
		t.update(ref, databaseUpdates)
	}

	return undefined
}
