// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Id } from '~/Data'
import type { DocPath } from '~/Path'
import type { IRef } from '~/Ref/IRef'

import type { DocContext } from './DocContext'
import type { DTI, IDocTI } from './DocTI'

/**
 * Unknown Doc
 *
 * - Every `Doc` is assignable to it
 */
export type IDoc = {
	[DTI]: IDocTI

	readonly id: Id
	readonly path: DocPath
	readonly ref: IRef

	readonly data: object
	dataWithoutId(): object
	dataWithId(): { id: Id }

	update(updates: any): Promise<IDoc | null | undefined>

	delete(): Promise<null>

	methods: {}
} // & GData<IDocTI>

/**
 * Unknown Doc_ (Doc + internal fields)
 *
 * - Every `Doc_` is assignable to it
 */
export interface IDoc_ extends IDoc {
	readonly _context: DocContext
	_setRaw(raw: unknown): void
	// readonly db: Db
}
