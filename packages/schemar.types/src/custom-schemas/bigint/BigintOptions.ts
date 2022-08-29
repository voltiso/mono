// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface BigintOptions extends SchemaOptions {
	Output: bigint
	Input: bigint

	min: bigint | undefined
	max: bigint | undefined
}

export interface DefaultBigintOptions extends DefaultSchemaOptions {
	Output: bigint
	Input: bigint

	min: undefined
	max: undefined
}
