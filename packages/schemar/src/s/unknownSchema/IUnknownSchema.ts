// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { UnknownSchemaOptions } from './_/UnknownSchemaOptions.js'

export const IS_UNKNOWN_SCHEMA = Symbol('IS_UNKNOWN')
export type IS_UNKNOWN_SCHEMA = typeof IS_UNKNOWN_SCHEMA

export interface IUnknownSchema<
	O extends UnknownSchemaOptions = UnknownSchemaOptions,
> extends ISchema<O> {
	readonly [IS_UNKNOWN_SCHEMA]: true
}

export function isUnknownSchema(x: unknown): x is IUnknownSchema {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IUnknownSchema | null)?.[IS_UNKNOWN_SCHEMA])
}
