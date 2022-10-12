// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocRefDatabase, DocRefJson } from '~/common'
import type { Id } from '~/Data'
import type { DocTI, DocTILike, DTI } from '~/Doc/DocTI'
import type { DocLike } from '~/Doc/IDoc'
import type { DocPath } from '~/Path'

import type { DocFieldPath } from './DocFieldPath'

export const IS_DOC_REF = Symbol('IS_DOC_REF')
export type IS_DOC_REF = typeof IS_DOC_REF

export interface DocRefBaseLike<TI extends DocTILike = DocTILike> {
	readonly [IS_DOC_REF]: true
	readonly [DTI]: TI
	readonly Exists: any
	readonly path: DocPath
	readonly isStrong: boolean
}

export interface DocRefLike<TI extends DocTILike = DocTILike>
	extends DocRefBaseLike<TI>,
		PromiseLike<DocLike | null> {}

export interface IDocRefBase {
	readonly [IS_DOC_REF]: true

	readonly [DTI]: DocTI
	readonly Exists: boolean

	readonly isStrong: boolean

	readonly id: Id
	readonly path: DocPath

	readonly data: DocFieldPath
	readonly methods: {}

	dataWithId(): PromiseLike<unknown>
	dataWithoutId(): PromiseLike<unknown>

	get(): PromiseLike<DocLike | null>
	set(data: any): PromiseLike<DocLike>
	update(updates: any): PromiseLike<unknown>
	delete(): PromiseLike<null>

	toJSON(): DocRefJson
	toDatabase(): DocRefDatabase
}

// export interface DocRefLike extends RefLike, PromiseLike<DocLike | null> {}

// export interface IRef extends IDocRefBase, PromiseLike<IDoc | null> {}
