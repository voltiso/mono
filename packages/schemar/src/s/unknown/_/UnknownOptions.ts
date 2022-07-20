// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export type UnknownOptions = SchemaOptions

export const defaultUnknownOptions = lazyValue(() => defaultSchemaOptions)

export type DefaultUnknownOptions = typeof defaultUnknownOptions
