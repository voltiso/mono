// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export type UnknownSchemaOptions = SchemaOptions

export const defaultUnknownSchemaOptions = lazyValue(() => defaultSchemaOptions)

export type DefaultUnknownSchemaOptions = typeof defaultUnknownSchemaOptions
