// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithSelfBoundCALL } from '~/function'

export interface BoundCallableInputWithCALL extends WithSelfBoundCALL {
	clone?(): this
}
