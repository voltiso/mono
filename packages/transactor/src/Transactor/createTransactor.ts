// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as FirestoreLike from '@voltiso/firestore-like'

import type { FirestoreLikeModule } from '../DatabaseContext.js'
import type { TransactorConstructorParameters } from './ConstructorParameters.js'
import type { Options_ } from './Options.js'
import type { Transactor } from './Transactor.js'
import { Transactor_ } from './Transactor_.js'

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
	return new Transactor_(...args)
}
