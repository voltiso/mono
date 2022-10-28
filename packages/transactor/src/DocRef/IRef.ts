// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefDatabase, DocRefJson } from '~/common'
import type { Id } from '~/Data'
import type { DocTI, DTI } from '~/Doc/DocTI'
import type { $$Doc } from '~/Doc/IDoc'
import type { DocPath } from '~/Path'

import type { DocFieldPath } from './DocFieldPath'

export const IS_DOC_REF = Symbol('IS_DOC_REF')
export type IS_DOC_REF = typeof IS_DOC_REF

export interface $$DocRef {
	readonly [IS_DOC_REF]: true
}

export interface IDocRef extends IDocRefBase, PromiseLike<$$Doc | null> {}

export interface IDocRefBase extends $$DocRef {
	readonly [DTI]: DocTI
	readonly Exists: boolean

	readonly isStrong: boolean

	readonly id: Id
	readonly path: DocPath

	readonly data: DocFieldPath
	readonly methods: {}

	dataWithId(): PromiseLike<unknown>
	dataWithoutId(): PromiseLike<unknown>

	get(): PromiseLike<$$Doc | null>
	set(data: any): PromiseLike<$$Doc>
	update(updates: any): PromiseLike<unknown>
	delete(): PromiseLike<null>

	toJSON(): DocRefJson
	toDatabase(): DocRefDatabase
}
