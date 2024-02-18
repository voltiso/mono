// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import { or } from '~/base-schemas/union/or'

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
