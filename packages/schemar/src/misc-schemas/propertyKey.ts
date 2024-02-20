// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isPolluting, lazyObject } from '@voltiso/util'

import { number } from '../base-schemas/number'
import { string } from '../base-schemas/string'
import type { CustomUnion$ } from '../base-schemas/union'
import { or } from '../base-schemas/union'
import { symbol } from '../base-schemas/unknownSymbol'

export type __hack_miscSchemas_propertyKey = CustomUnion$<{}>

/**
 * Check for `keyof any`
 *
 * - ✅ Checks for prototype pollution
 */
export const propertyKey = lazyObject(() =>
	or(string, number, symbol)
		.Cast<PropertyKey>()
		.check(key => !isPolluting(key)),
)
