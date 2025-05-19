// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Doc } from './Doc'

// declare global {
// 	namespace Voltiso {
// 		namespace Transactor {
// 			const __never_keyof_bug_workaround: unique symbol
// 			type __never_keyof_bug_workaround = typeof __never_keyof_bug_workaround
// 		}
// 	}
// }

// if (
// 	typeof (globalThis as any).Voltiso !== 'object' ||
// 	(globalThis as any).Voltiso === null
// ) {
// 	;(globalThis as any).Voltiso = {}
// }
// if (
// 	typeof (globalThis as any).Voltiso.Transactor !== 'object' ||
// 	(globalThis as any).Voltiso.Transactor === null
// ) {
// 	;(globalThis as any).Voltiso.Transactor = {}
// }

// ;(Voltiso as any).Transactor.__never_keyof_bug_workaround ??= Symbol.for(
// 	'@voltiso/transactor/__never_keyof_bug_workaround',
// )

// /**
//  * Empty interfaces (not yet augmented) causes inlining of `never` keyof in
//  * `.d.ts`
//  */
// export type __never_keyof_bug_workaround =
// 	Voltiso.Transactor.__never_keyof_bug_workaround

// /**
//  * Empty interfaces (not yet augmented) causes inlining of `never` keyof in
//  * `.d.ts`
//  */
// export const __never_keyof_bug_workaround: __never_keyof_bug_workaround =
// 	Voltiso.Transactor.__never_keyof_bug_workaround

/** Map from `DocTag` string to a Doc type */

export interface DocTypes {
	__never_keyof_bug_workaround: Doc
	// [__never_keyof_bug_workaround]: Doc
	// [k: string]: $$Doc // ! nice but dangerous if lib-user uses `keyof DocTypes`
}
