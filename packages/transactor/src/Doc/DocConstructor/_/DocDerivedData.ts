// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDocTI } from '~/Doc'
import type {
	BeforeCommitTrigger,
	OnGetTrigger,
	UnknownTrigger,
} from '~/Trigger'

export interface DocDerivedData extends IDocTI {
	readonly afters: readonly UnknownTrigger[]
	readonly beforeCommits: readonly BeforeCommitTrigger[]
	readonly onGets: readonly OnGetTrigger[]
}

export const defaultDocDerivedData = {
	tag: 'untagged',

	publicOnCreation: {},
	public: {},
	private: {},

	afters: [],
	beforeCommits: [],
	onGets: [],

	methods: {},
} as const

// export type DefaultDocDerivedData = typeof defaultDocDerivedData
