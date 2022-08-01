// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Id } from '../Data'
import type { DTI, IDocTI } from '../Doc/DocTI.js'
import type { IDoc } from '../Doc/IDoc.js'
import type { DocPath } from '../Path'
import type { DocFieldPath } from './DocFieldPath.js'

export const IS_DOC_REF = Symbol('IS_DOC_REF')

export interface IRefBase {
	[IS_DOC_REF]: true

	[DTI]: IDocTI

	readonly id: Id
	readonly path: DocPath

	readonly data: DocFieldPath
	readonly methods: object

	dataWithId(): PromiseLike<unknown>
	dataWithoutId(): PromiseLike<unknown>

	get(): PromiseLike<IDoc | null>
	set(data: any): PromiseLike<IDoc>
	update(updates: any): PromiseLike<unknown>
	delete(): PromiseLike<null>

	// clone(): this
	toJSON(): object
}

export interface IRef extends IRefBase, PromiseLike<IDoc | null> {}
