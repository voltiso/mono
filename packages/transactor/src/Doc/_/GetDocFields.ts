// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar.types'

import type { DocFieldPath } from '~/DocFieldPath'
import type { $$DocRelatedLike } from '~/DocRelated'

import type { GetData } from './GData'

/** @inline */
export type GetDocFields<R extends $$DocRelatedLike> = GetDocFields.ForData<
	GetData<R>
>

export namespace GetDocFields {
	export type ForData<data extends $$Schemable> = ForFinalData<data>

	// export type ForData<data extends $$Schemable> = ForFinalData<
	// 	TightenRefs<data>
	// >

	export type ForFinalData<data> = {
		[k in keyof data]: DocFieldPath<data[k]>
	}
}
