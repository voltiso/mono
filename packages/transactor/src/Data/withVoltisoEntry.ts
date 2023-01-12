// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IntrinsicFields } from '~/schemas'
import { sVoltisoEntry } from '~/schemas'
import type { WithTransactor } from '~/Transactor'
import { guardedValidate } from '~/util'

export function withVoltisoEntry<O extends { __voltiso?: unknown }>(
	ctx: WithTransactor,
	data: O,
): O & IntrinsicFields {
	return {
		...data,
		__voltiso: guardedValidate(ctx, sVoltisoEntry, data.__voltiso),
	}
}
