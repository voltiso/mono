// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'

import { defaultSchemaOptions } from '~/Schema'

export const defaultObjectOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,

	shape: {} as unknown as t.InferableObjectLike,

	indexSignatures: [] as [],
}
