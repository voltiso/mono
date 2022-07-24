// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocumentData } from './DocumentData'
import type { DocumentReference } from './DocumentReference'
import type { DocumentSnapshot } from './DocumentSnapshot'
import type { Query } from './Query'
import type { QuerySnapshot } from './QuerySnapshot'

type PossiblyPromise<X> = X | Promise<X>

export interface Transaction {
	get(ref: DocumentReference): PossiblyPromise<DocumentSnapshot>
	get(ref: Query): PossiblyPromise<QuerySnapshot>

	set(ref: any, data: DocumentData): void
	update(ref: any, data: any): void
	delete(ref: any): void
}
