// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import { or } from '~/base-schemas/union/or'
import type { Union$ } from '~/base-schemas/union/Union'

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __hack_sValidationIssueSeverity = Union$<[]>

/**
 * If just a `'warning'`, schema validation is considered successful anyway
 *
 * @defaultValue `error`
 */
export const validationIssueSeverity = lazyObject(() => or('error', 'warning'))

/**
 * If just a `'warning'`, schema validation is considered successful anyway
 *
 * @defaultValue `error`
 */
export type ValidationIssueSeverity = typeof validationIssueSeverity.Output
