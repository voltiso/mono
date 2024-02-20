// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import { defaultSchemaOptions } from '~/Schema/options/defaultSchemaOptions'
import type { SchemaOptions } from '~/Schema/options/SchemaOptions'

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __hack_defaultSchemaInferrerOptions = SchemaOptions

export const defaultSchemaInferrerOptions = lazyObject(
	() => defaultSchemaOptions,
)
