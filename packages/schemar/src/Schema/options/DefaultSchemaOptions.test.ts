// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { DefaultSchemaOptions } from './DefaultSchemaOptions'
import type { SchemaOptions } from './SchemaOptions'

describe('DefaultSchemaOptions', () => {
	it('type', () => {
		$Assert.is<DefaultSchemaOptions, SchemaOptions>()
	})
})
