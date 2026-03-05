// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert, $dev } from '@voltiso/util'

import type { Aggregator } from '~/Aggregator/Aggregator'
import type { DocTI, IS_DOC_TYPE_INFO } from '~/Doc/DocTI'
import { sAutoId } from '~/schemas/sAutoId'
import type { AfterTrigger, OnGetTrigger, Trigger } from '~/Trigger/Trigger'

export interface DocDerivedData extends DocTI {
	id: DocTI['id']

	aggregates: {}
	readonly methods: {}

	readonly afters: readonly AfterTrigger[]
	readonly beforeCommits: readonly Trigger.BeforeCommit[]
	readonly onGets: readonly OnGetTrigger[]

	readonly aggregators: readonly Aggregator[]

	readonly suppressMissingSchemaError?: boolean
}

export const emptyDocDerivedSchema = s.object({})

export const defaultDocDerivedData: DocDerivedData = {
	/** ! never used - type only */
	// [IS_DOC_TYPE_INFO]: true,

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
} satisfies Omit<DocDerivedData, typeof IS_DOC_TYPE_INFO> as never

//

//

//

$dev(() => {
	$Assert.is<typeof defaultDocDerivedData, DocDerivedData>()
})
