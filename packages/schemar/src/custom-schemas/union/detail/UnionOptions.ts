// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast2 } from '@voltiso/util'
import { lazyValue } from '@voltiso/util'

import type { Schemable, SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface UnionOptions extends SchemaOptions {
	schemas: AtLeast2<Schemable>
}

export const defaultUnionOptions = lazyValue(() => ({
	...defaultSchemaOptions,

	schemas: 0 as unknown as AtLeast2<Schemable>,
}))

export type DefaultUnionOptions = typeof defaultUnionOptions
