// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemableLike } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomRecordImpl } from './CustomRecordImpl'
import { defaultRecordOptions } from './defaultRecordOptions'

export class RecordImpl<
	TKeySchema extends { OutputType: keyof any },
	TValueSchema extends SchemableLike,
> extends lazyConstructor(() => CustomRecordImpl)<never> {
	constructor(keySchema: TKeySchema, valueSchema: TValueSchema)

	constructor(valueSchema: TValueSchema)

	constructor(...args: [TKeySchema, TValueSchema] | [TValueSchema])

	constructor(...args: [TKeySchema, TValueSchema] | [TValueSchema]) {
		if (args.length >= 2)
			super({
				...defaultRecordOptions,
				keySchema: args[0],
				valueSchema: args[1],
			} as never)
		else
			super({ ...defaultRecordOptions, valueSchema: args[0] as never } as never)
	}
}
