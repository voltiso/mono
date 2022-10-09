// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Aggregator } from '~/Aggregator'
import type { DocTI } from '~/Doc'
import type {
	BeforeCommitTrigger,
	OnGetTrigger,
	UnknownTrigger,
} from '~/Trigger'

export interface DocDerivedData extends DocTI {
	readonly afters: readonly UnknownTrigger[]
	readonly beforeCommits: readonly BeforeCommitTrigger[]
	readonly onGets: readonly OnGetTrigger[]

	readonly aggregators: readonly Aggregator[]

	readonly suppressMissingSchemaError?: boolean
}

export const defaultDocDerivedData = {
	tag: 'untagged',

	id: undefined,

	publicOnCreation: {},
	public: {},
	private: {},
	aggregates: {},

	afters: [],
	beforeCommits: [],
	onGets: [],
	aggregators: [],

	methods: {},
} as const

// export type DefaultDocDerivedData = typeof defaultDocDerivedData
