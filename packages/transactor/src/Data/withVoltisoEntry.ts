// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

import type { IntrinsicFields } from '~/schemas'
import { sVoltisoEntry } from '~/schemas'
import type { WithTransactor } from '~/Transactor'
import { guardedValidate_ } from '~/util'

export function withVoltisoEntry<O extends { __voltiso?: unknown }>(
	ctx: WithTransactor,
	data: O,
): _<O & IntrinsicFields> {
	return {
		...data,
		__voltiso: guardedValidate_(ctx, sVoltisoEntry, data.__voltiso) as never,
	}
}
