// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isPlainObject, undef } from '@voltiso/util'

import type { DocumentData } from './DocumentData'
import type { DocumentSnapshot } from './DocumentSnapshot'
import type { UpdateData } from './UpdateData'

type MaybePromise<X> = X | Promise<X>

export type DocumentReference = {
	get: () => MaybePromise<DocumentSnapshot>
	set: (data: DocumentData) => MaybePromise<unknown>
	update: (data: UpdateData) => MaybePromise<unknown>
	delete: () => MaybePromise<unknown>
	id: string
	path: string
}

export function isDocumentReference(x: unknown): x is DocumentReference {
	return (
		!isPlainObject(x) &&
		(x as DocumentReference | null)?.update !== undef &&
		(x as DocumentReference | null)?.set !== undef &&
		(x as DocumentReference | null)?.path !== undef
	)
}
