// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { RecordImpl } from './RecordImpl'

type Record_<
	TKeySchema extends {
		OutputType: keyof any
		InputType: keyof any | undefined
	},
	TValueSchema extends t.SchemableLike,
> = t.Record<TKeySchema, TValueSchema>

const Record_ = lazyConstructor(
	() => RecordImpl,
) as unknown as t.RecordConstructor

export { Record_ as Record }
