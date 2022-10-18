// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { ObjectLike } from '@voltiso/schemar.types'

import type { Aggregator } from '~/Aggregator'
import type {
	BeforeCommitTrigger,
	OnGetTrigger,
	UnknownTrigger,
} from '~/Trigger'

export interface DocDerivedData /* extends DocTI */ {
	tag: any

	id: unknown

	readonly publicOnCreation: ObjectLike
	readonly public: ObjectLike
	readonly private: ObjectLike

	aggregates: {}
	methods: {}

	readonly afters: readonly UnknownTrigger[]
	readonly beforeCommits: readonly BeforeCommitTrigger[]
	readonly onGets: readonly OnGetTrigger[]

	readonly aggregators: readonly Aggregator[]

	readonly suppressMissingSchemaError?: boolean
}

export const emptyDocDerivedSchema = s.object({})

export const defaultDocDerivedData = {
	tag: 'untagged',

	id: undefined,

	publicOnCreation: emptyDocDerivedSchema,
	public: emptyDocDerivedSchema,
	private: emptyDocDerivedSchema,

	aggregates: {},

	afters: [],
	beforeCommits: [],
	onGets: [],
	aggregators: [],

	methods: {},
} as const

// export type DefaultDocDerivedData = typeof defaultDocDerivedData
