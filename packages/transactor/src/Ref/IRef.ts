// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Id } from '~/Data'
import type { DocTILike, DTI } from '~/Doc/DocTI'
import type { DocLike, IDoc } from '~/Doc/IDoc'
import type { DocPath } from '~/Path'

import type { DocFieldPath } from './DocFieldPath'

export const IS_DOC_REF = Symbol('IS_DOC_REF')
export type IS_DOC_REF = typeof IS_DOC_REF

export interface RefBaseLike {
	[IS_DOC_REF]: true
}

export interface IRefBase extends RefBaseLike {
	[IS_DOC_REF]: true

	[DTI]: DocTILike
	readonly Exists: boolean

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

	toJSON(): object
}

export interface RefLike extends RefBaseLike, PromiseLike<DocLike | null> {}

export interface IRef extends IRefBase, PromiseLike<IDoc | null> {}
