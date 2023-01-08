// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '~'
import { defaultSchemaOptions } from '~'

export const defaultObjectOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,

	shape: {} as unknown as t.$$InferableObject,

	indexSignatures: [] as [],

	isPlain: false,
}
