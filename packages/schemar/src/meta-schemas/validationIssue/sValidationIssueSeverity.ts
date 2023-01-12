// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import { or } from '~/base-schemas/union/or'

/**
 * If just a `'warning'`, schema validation is considered successful anyway
 *
 * @defaultValue `error`
 */
export const validationIssueSeverity = lazyValue(() => or('error', 'warning'))

/**
 * If just a `'warning'`, schema validation is considered successful anyway
 *
 * @defaultValue `error`
 */
export type ValidationIssueSeverity = typeof validationIssueSeverity.Output
