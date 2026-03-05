// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IdString } from '~/brand'
import type { DocRefDatabase, DocRefJson } from '~/common'
import type { IDoc, IDoc$ } from '~/Doc'
import type { DocPath } from '~/Path'

import type { DocFieldPath } from '../DocFieldPath/DocFieldPath'
import type { $$DocRef } from './$$DocRef'

export interface IDocRef extends IDocRefBase, PromiseLike<IDoc | null> {}

export interface IDocRef$ extends IDocRefBase, PromiseLike<IDoc$ | null> {
	readonly asStrongRef: IDocRef$
	readonly asWeakRef: IDocRef$
}

export interface IDocRefBase extends $$DocRef {
	readonly isStrong: boolean

	readonly id: IdString
	readonly path: DocPath

	readonly methods: {}

	readonly data: DocFieldPath
	dataWithId(): PromiseLike<unknown>

	get(): PromiseLike<IDoc | null>
	set(data: any): PromiseLike<IDoc>
	update(updates: any): PromiseLike<unknown>
	delete(): PromiseLike<null>

	toJSON(): DocRefJson
	toDatabase(): DocRefDatabase
}
