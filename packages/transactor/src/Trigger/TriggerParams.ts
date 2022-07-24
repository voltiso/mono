// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PathMatches } from '../common/PathMatches.js'
import type { Id } from '../Data'
import type { Db } from '../Db'
import type { DTI, IDoc } from '../Doc'
import type { IntrinsicFields } from '../Doc/_'
import type { DocPath } from '../Path'
import type { DocRefContext } from '../Ref/_/Context.js'

export type TriggerParams<D extends IDoc = IDoc, This = D | null> = {
	doc: This

	path: DocPath<D[DTI]['tag']>
	id: Id<D>

	db: Db
} & PathMatches &
	DocRefContext

export type AfterTriggerParams<
	D extends IDoc = IDoc,
	This = D | null,
	Before extends boolean = boolean,
	After extends boolean = boolean,
> = TriggerParams<D, This> & {
	before: Before extends true
		? ReturnType<D['dataWithId']>
		: Before extends false
		? null
		: never
	after: After extends true
		? ReturnType<D['dataWithId']>
		: After extends false
		? null
		: never
}

export type BeforeCommitTriggerParams<D extends IDoc> = TriggerParams<D> &
	IntrinsicFields
