// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'

$fastAssert(defaultSchemaOptions)

export const defaultNumberOptions = Object.freeze({
	...defaultSchemaOptions,

	Output: 0 as unknown as number,
	Input: 0 as unknown as number,

	isInteger: false as const,
	// eslint-disable-next-line sonarjs/no-undefined-assignment
	min: undefined,
	// eslint-disable-next-line sonarjs/no-undefined-assignment
	max: undefined,
})
