// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocFieldPath } from '~/DocFieldPath'
import type { $$DocRelatedLike } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

import type { GetData } from './GetData'

/** @inline */
export type GetDocFields<R extends $$DocRelatedLike> = R extends AnyDoc
	? GetDocFields.ForData<{ [k: string]: unknown }>
	: GetDocFields.ForData<GetData<R>>

export namespace GetDocFields {
	export type ForData<data> = {
		[k in keyof data]: DocFieldPath<data[k]>
	}
}
