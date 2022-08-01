// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomUnknownSchema, GetSchemaFunction } from '~'
import { UnknownSchemaImpl } from '~'

export interface UnknownSchema
	extends CustomUnknownSchema<{}>,
		GetSchemaFunction {}

export const UnknownSchema = lazyConstructor(
	() => UnknownSchemaImpl,
) as unknown as UnknownConstructor

type UnknownConstructor = new () => UnknownSchema

export const schema = lazyValue(() => new UnknownSchema())
