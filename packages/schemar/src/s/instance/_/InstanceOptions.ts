// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface InstanceOptions extends SchemaOptions {
	constructor: abstract new (...args: never[]) => object
	_out: object
	_in: object
}

export const defaultInstanceOptions = {
	...defaultSchemaOptions,
}

export type DefaultInstanceOptions = typeof defaultInstanceOptions
