// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Doc, DocTI } from '~/Doc'
import type { DocTypes } from '~/DocTypes-module-augmentation'

type GDocByTag_<TI extends DocTI> = TI['tag'] extends 'untagged'
	? never
	: TI['tag'] extends keyof DocTypes
	? DocTypes[TI['tag']]
	: never

export type GDocByTag<TI extends DocTI> = GDocByTag_<TI> extends never
	? GO<TI>
	: GDocByTag_<TI>

// export type GDoc<TI extends IDocTI, Ctx extends ExecutionContext = 'outside'> = IDoc extends TI['doc']
// 	? Doc<TI, Ctx>
// 	: Ctx extends 'outside'
// 	? Exclude<TI['doc'], undefined>
// 	: Ctx extends 'inside'
// 	? Exclude<TI['docInside'], undefined>
// 	: never

/**
 * Get Doc from DocTI - inside execution context (can access public, const,
 * private, protected)
 *
 * @inline
 */
export type GI<TI extends DocTI> = Doc<TI, 'inside'>

/**
 * Get Doc from DocTI - outside execution context (can access public only)
 *
 * @inline
 */
export type GO<TI extends DocTI> = Doc<TI, 'outside'>
