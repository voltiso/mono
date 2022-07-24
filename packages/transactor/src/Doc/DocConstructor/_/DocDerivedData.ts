// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BeforeCommitTrigger,
	OnGetTrigger,
	UnknownTrigger,
} from '../../../Trigger/Trigger'
import type { IDocTI } from '../../DocTI'

export interface DocDerivedData extends IDocTI {
	readonly afters: readonly UnknownTrigger[]
	readonly beforeCommits: readonly BeforeCommitTrigger[]
	readonly onGets: readonly OnGetTrigger[]
}

export const defaultDocDerivedData = {
	tag: 'untagged',
	const: {},
	private: {},
	protected: {},
	public: {},
	afters: [],
	beforeCommits: [],
	onGets: [],
	methods: {},
} as const

// export type DefaultDocDerivedData = typeof defaultDocDerivedData
