// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DateJson } from './DateJson'

export function jsonFromDate(date: Date): DateJson {
	return {
		__date: date.toISOString(),
	}
}
