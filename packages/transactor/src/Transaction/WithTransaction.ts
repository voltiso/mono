// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { Forbidden } from '~/util'

import type { Transaction } from './Transaction'

export type WithTransaction = { transaction: Transaction }

export function isWithTransaction(
	x: Partial<WithTransaction> | AlsoAccept<object>,
): x is WithTransaction {
	return Boolean((x as WithTransaction | null)?.transaction)
}

export const isWithoutTransaction = (
	x: Partial<WithTransaction>,
): x is Forbidden<WithTransaction> => !x.transaction
