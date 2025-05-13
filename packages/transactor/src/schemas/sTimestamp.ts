// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isTimestamp } from '@voltiso/firestore-like'
import * as s from '@voltiso/schemar'

export const sTimestamp = s
	.instance(Date)
	.fix(s.string, value => new Date(value))
	.fixIf(isTimestamp, value => value.toDate())
	.check(value => !Number.isNaN(value.getTime()), 'valid date')
