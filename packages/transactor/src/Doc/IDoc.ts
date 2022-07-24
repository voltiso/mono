// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Id } from '../Data'
import type { DocPath } from '../Path'
import type { IRef } from '../Ref/IRef'
import type { Context } from './Context'
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

	readonly data: { id?: never }
	dataWithoutId(): { id?: never }
	dataWithId(): { id: Id }

	update(updates: any): Promise<IDoc | null | undefined>

	delete(): Promise<null>

	methods: object
} // & GData<IDocTI>

/**
 * Unknown Doc_ (Doc + internal fields)
 *
 * - Every `Doc_` is assignable to it
 */
export interface IDoc_ extends IDoc {
	readonly _context: Context
	_setRaw(raw: unknown): void
	// readonly db: Db
}
