// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { UnknownSchemaImpl } from './UnknownSchemaImpl'

export type UnknownSchema = t.UnknownSchema

export const UnknownSchema = lazyConstructor(
	() => UnknownSchemaImpl,
) as unknown as t.UnknownSchemaConstructor

export const schema = lazyValue(() => new UnknownSchema())
