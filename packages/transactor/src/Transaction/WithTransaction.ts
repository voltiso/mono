// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Forbidden } from '../util'
import type { Transaction_ } from './Transaction_'

export type WithTransaction = { transaction: Transaction_ }

export const isWithTransaction = (
	x: Partial<WithTransaction>,
): x is WithTransaction => Boolean(x.transaction)
export const isWithoutTransaction = (
	x: Partial<WithTransaction>,
): x is Forbidden<WithTransaction> => !x.transaction
