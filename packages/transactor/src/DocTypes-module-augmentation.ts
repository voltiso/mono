// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Doc } from './Doc'

/**
 * Empty interfaces (not yet augmented) causes inlining of `never` keyof in
 * `.d.ts`
 */
export const __never_keyof_bug_workaround = Symbol(
	'__never_keyof_bug_workaround',
)

/** Map from `DocTag` string to a Doc type */

export interface DocTypes {
	__never_keyof_bug_workaround: Doc
	// [__never_keyof_bug_workaround]: Doc$
	// [AnyDoc]: IndexedDoc
	// [k: string]: $$Doc // ! nice but dangerous if lib-user uses `keyof DocTypes`
}
