// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type { DocTI } from '~/Doc'
import type { DocFieldPath } from '~/DocFieldPath'

import type { GetDocFields } from './GetDocFields'

describe('GDocFields', () => {
	it('works', () => {
		expect.assertions(0)

		type X = GetDocFields<DocTI>
		$Assert(
			$Is<X>().identicalTo<{
				__voltiso: DocFieldPath<{
					aggregateTarget: {}
					numRefs: number
					aggregateSource: Record<string, Record<string, true>>
					migrations: Record<string, { migratedAt: Date }>
					numMigrations: number
					createdAt: Date
					updatedAt: Date
					migratedAt: Date
				}>
			}>(),
		)
	})
})
