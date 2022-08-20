// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { SchemableLike, SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface UnionOptions extends SchemaOptions {
	schemas: SchemableLike[]
}

export const defaultUnionOptions = lazyValue(() => ({
	...defaultSchemaOptions,

	schemas: 0 as unknown as SchemableLike[],
}))

export type DefaultUnionOptions = typeof defaultUnionOptions
