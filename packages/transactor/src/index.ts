// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import './zone.js'

export type { CollectionRef } from './CollectionRef'
export type { Id } from './Data'
export type {
	DatabaseContext,
	FirestoreLikeModule as DatabaseStaticContext,
} from './DatabaseContext.js'
export { Db } from './Db'
export {
	after,
	afterCreate,
	afterCreateOrUpdate,
	afterDelete,
	afterUpdate,
	beforeCommit,
	method,
	onGet,
} from './decorators.js'
export type { DocConstructor, IDoc } from './Doc'
export { Doc, DTI, IndexedDoc } from './Doc'
export type { DocTypes } from './DocTypes.js'
export type { TransactorError } from './error'
export { deleteIt, incrementIt, replaceIt } from './it'
export type { Method } from './Method.js'
export { newAutoId } from './newAutoId.js'
export { DocPath } from './Path'
export type { DocRef, Ref, WeakDocRef, WeakRef } from './Ref'
export { doc } from './Ref'
export * as schemas from './schemas'
export type { Transaction } from './Transaction'
export type { Options } from './Transactor'
export { createTransactor, Transactor } from './Transactor'
export type { TriggerParams } from './TriggerParams'
