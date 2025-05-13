// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { SchemaOptions } from './SchemaOptions'

describe('SchemaOptions.Default', () => {
	it('type', () => {
		$Assert.is<SchemaOptions.Default, SchemaOptions>()
	})
})
