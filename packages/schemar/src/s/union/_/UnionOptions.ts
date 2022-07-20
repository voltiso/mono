// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast2 } from '@voltiso/util'
import { lazyValue } from '@voltiso/util'

import type { RootSchemable, SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface UnionOptions extends SchemaOptions {
	schemas: AtLeast2<RootSchemable>
}

export const defaultUnionOptions = lazyValue(() => ({
	...defaultSchemaOptions,
}))

export type DefaultUnionOptions = typeof defaultUnionOptions
