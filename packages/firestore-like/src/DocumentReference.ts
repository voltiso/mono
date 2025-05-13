// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'
import { $AssumeType } from '@voltiso/util'

import type { DocumentData } from './DocumentData'
import type { DocumentSnapshot } from './DocumentSnapshot'
import type { UpdateData } from './UpdateData'

export interface DocumentReference {
	readonly id: string
	readonly path: string
}

export function isDocumentReference(x: unknown): x is DocumentReference {
	return isClientDocumentReference(x) || isServerDocumentReference(x)
}

//

export interface ServerDocumentReference extends DocumentReference {
	get(): MaybePromise<DocumentSnapshot>
	set(data: DocumentData): MaybePromise<unknown>
	update(data: UpdateData): MaybePromise<unknown>
	delete(): MaybePromise<unknown>
}

export function isServerDocumentReference(
	x: unknown,
): x is ServerDocumentReference {
	$AssumeType<Partial<ServerDocumentReference> | null>(x)
	return Boolean(x?.update && x.set && x.path && x.id)
}

//

export interface ClientDocumentReference extends DocumentReference {
	readonly type: 'document'
}

export function isClientDocumentReference(
	x: unknown,
): x is ClientDocumentReference {
	return (x as ClientDocumentReference | null)?.type === 'document'
}
