// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as Database from '@voltiso/firestore-like'
import { isDatabase } from '@voltiso/firestore-like'
import { stringFrom } from '@voltiso/util'

import type { $WithId } from '~/Data'
import type { DatabaseContext } from '~/DatabaseContext'
import type { IDoc } from '~/Doc'
import { TransactorError } from '~/error'
import { isDeleteIt, isReplaceIt } from '~/it'
import type { IntrinsicFields } from '~/schemas'
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
): Promise<$WithId<IntrinsicFields, IDoc>> => {
	if (transactor.readOnly)
		throw new TransactorError(
			`cannot write to readOnly db - databaseSet(data=${stringFrom(data)})`,
		)

	const firestoreData = toDatabaseSet(ctx, data)

	if (isDatabase(t)) {
		assertNotInTransaction()
		await ref.set(firestoreData)
	} else {
		assertInTransaction()
		t.set(ref, firestoreData)
	}

	return { ...data, id: ref.id }
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
		return databaseSet(transactor, ctx, t, ref, updates.data as never)
	}

	if (isDeleteIt(updates)) return databaseDelete(t, ref)

	const firestoreUpdates = toDatabaseUpdate(ctx, updates)

	if (isDatabase(t)) {
		assertNotInTransaction()
		await ref.update(firestoreUpdates)
	} else {
		assertInTransaction()
		t.update(ref, firestoreUpdates)
	}

	return undefined
}
