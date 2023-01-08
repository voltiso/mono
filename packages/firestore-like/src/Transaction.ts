// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

import type { DocumentData } from './DocumentData'
import type { ServerDocumentReference } from './DocumentReference'
import type { DocumentSnapshot } from './DocumentSnapshot'
import type { Query } from './Query'
import type { QuerySnapshot } from './QuerySnapshot'

export interface Transaction {
	get(ref: ServerDocumentReference): MaybePromise<DocumentSnapshot>
	get(ref: Query): MaybePromise<QuerySnapshot>

	set(ref: any, data: DocumentData): void
	update(ref: any, data: any): void
	delete(ref: any): void
}
