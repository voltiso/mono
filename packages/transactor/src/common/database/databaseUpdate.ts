// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/max-params */

import type * as Database from '@voltiso/firestore-like'
import { isDatabase } from '@voltiso/firestore-like'
import { isDeleteIt, isReplaceIt, stringFrom } from '@voltiso/util'

import type { DocIdBrand } from '~/brand/Id'
import type { $WithId } from '~/Data'
import type { DatabaseContext } from '~/DatabaseContext'
import type { AnyDoc } from '~/DocTypes'
import { TransactorError } from '~/error'
import type { IntrinsicFields, VoltisoEntry } from '~/schemas'
import { sVoltisoEntry } from '~/schemas'
import type { Transactor, WithTransactor } from '~/Transactor'
import type { Updates } from '~/updates/Updates'
import { guardedValidate_ } from '~/util'

import {
	assertInTransaction,
	assertNotInTransaction,
} from './assertInTransaction'
import { toDatabaseSet, toDatabaseUpdate } from './toDatabase'

export type __hack_databaseUpdate = DocIdBrand | VoltisoEntry

type T = Database.Transaction | Database.Database

async function databaseDelete(
	ctx: WithTransactor,
	t: T,
	ref: Database.ServerDocumentReference,
) {
	if (isDatabase(t)) {
		assertNotInTransaction(ctx)
		await ref.delete()
	} else {
		assertInTransaction(ctx)
		t.delete(ref)
	}

	return null
}

async function databaseSet(
	transactor: Transactor,
	ctx: DatabaseContext,
	t: T,
	ref: Database.ServerDocumentReference,
	data: IntrinsicFields,
): Promise<$WithId<IntrinsicFields, AnyDoc>> {
	if (transactor.readOnly)
		throw new TransactorError(
			`cannot write to readOnly db - databaseSet(data=${stringFrom(data)})`,
		)

	const ctxOverride = transactor._transactionContext.tryGetValue

	const now = ctxOverride?.transaction
		? ctxOverride.transaction._date
		: new Date()

	// eslint-disable-next-line no-param-reassign
	data = {
		...data,

		__voltiso: guardedValidate_({ transactor }, sVoltisoEntry, {
			...data.__voltiso,
			createdAt: now,
			updatedAt: now,
		}) as never,
	}

	const firestoreData = toDatabaseSet(ctx, data)

	if (isDatabase(t)) {
		assertNotInTransaction({ transactor })
		await ref.set(firestoreData)
	} else {
		assertInTransaction({ transactor })
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
): Promise<
	| { readonly id: string & DocIdBrand<AnyDoc>; __voltiso: VoltisoEntry }
	| null
	| undefined
> {
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

	if (isDeleteIt(updates)) return databaseDelete({ transactor }, t, ref)

	const ctxOverride = transactor._transactionContext.tryGetValue

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
		assertNotInTransaction({ transactor })
		await ref.update(databaseUpdates)
	} else {
		assertInTransaction({ transactor })
		t.update(ref, databaseUpdates)
	}

	return undefined
}
