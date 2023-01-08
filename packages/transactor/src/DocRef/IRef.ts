// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IdString } from '~/brand'
import type { DocRefDatabase, DocRefJson } from '~/common'
import type { Doc } from '~/Doc'
import type { DocTI, DTI } from '~/Doc/DocTI'
import type { DocPath } from '~/Path'

import type { DocFieldPath } from '../DocFieldPath/DocFieldPath'
import type { $$DocRef } from './$$DocRef'

export interface IDocRef extends IDocRefBase, PromiseLike<Doc | null> {}

export interface IDocRefBase extends $$DocRef {
	readonly [DTI]: DocTI
	readonly Exists: boolean

	readonly isStrong: boolean

	readonly id: IdString
	readonly path: DocPath

	readonly data: DocFieldPath
	readonly methods: {}

	dataWithId(): PromiseLike<unknown>
	dataWithoutId(): PromiseLike<unknown>

	get(): PromiseLike<Doc | null>
	set(data: any): PromiseLike<Doc>
	update(updates: any): PromiseLike<unknown>
	delete(): PromiseLike<null>

	toJSON(): DocRefJson
	toDatabase(): DocRefDatabase
}
