// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { $$InferableObject } from '~/types/Inferable/Inferable'

$assert(defaultSchemaOptions)

export const defaultObjectOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as object,
	Input: 0 as unknown as object,

	shape: {} as unknown as $$InferableObject,

	indexSignatures: [] as [],

	isPlain: false,
})
