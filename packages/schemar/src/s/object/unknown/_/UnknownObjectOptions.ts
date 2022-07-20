// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '../../../../schema'
import { defaultSchemaOptions } from '../../../../schema'

export interface UnknownObjectOptions extends SchemaOptions {
	_out: object
	_in: object
}

export const defaultUnknownObjectOptions = {
	...defaultSchemaOptions,
}

export type DefaultUnknownObjectOptions = typeof defaultUnknownObjectOptions &
	UnknownObjectOptions
