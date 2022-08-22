// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'

import type { FirestoreLikeModule } from '~/DatabaseContext'

import type { TransactorConstructorParameters } from './ConstructorParameters'
import type { Options_ } from './Options'
import type { Transactor } from './Transactor'
import { TransactorImpl } from './TransactorImpl'

export function createTransactor(): Transactor

export function createTransactor(
	options: Partial<Options_> | undefined,
): Transactor

export function createTransactor(
	database: FirestoreLike.Database,
	firestoreLikeModule: FirestoreLikeModule,
): Transactor

export function createTransactor(
	database: FirestoreLike.Database,
	firestoreLikeModule: FirestoreLikeModule,
	options: Partial<Options_> | undefined,
): Transactor

export function createTransactor(...args: TransactorConstructorParameters) {
	return new TransactorImpl(...args)
}
