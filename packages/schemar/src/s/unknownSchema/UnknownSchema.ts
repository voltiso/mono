// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { GetSchemaFunction } from './_/getSchema'
import type { DefaultUnknownSchemaOptions } from './_/UnknownSchemaOptions.js'
import type { CustomUnknownSchema } from './CustomUnknownSchema.js'
import { UnknownSchema_ } from './UnknownSchema_.js'

export interface UnknownSchema
	extends CustomUnknownSchema<DefaultUnknownSchemaOptions>,
		GetSchemaFunction {}

export const UnknownSchema = UnknownSchema_ as unknown as UnknownConstructor

type UnknownConstructor = new () => UnknownSchema

export const schema = lazyValue(() => new UnknownSchema())

export type Schema<T = unknown> = CustomUnknownSchema<
	DefaultUnknownSchemaOptions & { _in: T; _out: T }
>
