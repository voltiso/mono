// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { Forbidden, ReplaceValues } from '~/util'

import type { Transaction } from './Transaction'

export type __hack_WithTransaction = ReplaceValues<{}, 0>

export interface WithTransaction {
	transaction: Transaction
}

export function isWithTransaction(
	x: Partial<WithTransaction> | AlsoAccept<object>,
): x is WithTransaction {
	return Boolean((x as WithTransaction | null)?.transaction)
}

export const isWithoutTransaction = (
	x: Partial<WithTransaction>,
): x is Forbidden<WithTransaction> => !x.transaction
