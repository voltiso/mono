// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert, $dev } from '@voltiso/util'

import type { Aggregator } from '~/Aggregator'
import type { DocTI } from '~/Doc'
import { IS_DOC_TYPE_INFO } from '~/Doc'
import { sAutoId } from '~/schemas'
import type { AfterTrigger, OnGetTrigger, Trigger } from '~/Trigger'

export interface DocDerivedData extends DocTI {
	id: DocTI['id']

	aggregates: {}
	methods: {}

	readonly afters: readonly AfterTrigger[]
	readonly beforeCommits: readonly Trigger.BeforeCommit[]
	readonly onGets: readonly OnGetTrigger[]

	readonly aggregators: readonly Aggregator[]

	readonly suppressMissingSchemaError?: boolean
}

export const emptyDocDerivedSchema = s.object({})

export const defaultDocDerivedData: DocDerivedData = {
	[IS_DOC_TYPE_INFO]: true,

	tag: undefined as unknown as never,

	id: sAutoId,

	publicOnCreation: emptyDocDerivedSchema,
	public: emptyDocDerivedSchema,
	private: emptyDocDerivedSchema,

	aggregates: {},

	afters: [],
	beforeCommits: [],
	onGets: [],
	aggregators: [],

	methods: {},
}

//

//

//

$dev(() => {
	$Assert.is<typeof defaultDocDerivedData, DocDerivedData>()
})
