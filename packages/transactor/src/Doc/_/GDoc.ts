// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Doc } from '../..'
import type { DocTypes } from '../../DocTypes.js'
import type { IDocTI } from '../DocTI.js'
import type { ExecutionContext } from '.'

type GDocByTag_<TI extends IDocTI> = TI['tag'] extends 'untagged'
	? never
	: DocTypes[TI['tag']]

export type GDocByTag<TI extends IDocTI> = GDocByTag_<TI> extends never
	? GO<TI>
	: GDocByTag_<TI>

// export type GDoc<TI extends IDocTI, Ctx extends ExecutionContext = 'outside'> = IDoc extends TI['doc']
// 	? Doc<TI, Ctx>
// 	: Ctx extends 'outside'
// 	? Exclude<TI['doc'], undefined>
// 	: Ctx extends 'inside'
// 	? Exclude<TI['docInside'], undefined>
// 	: never

export type GDoc<TI extends IDocTI, Ctx extends ExecutionContext> = Doc<TI, Ctx>

/**
 * Get Doc from DocTI - inside execution context (can access public, const,
 * private, protected)
 */
export type GI<TI extends IDocTI> = GDoc<TI, 'inside'>

/** Get Doc from DocTI - outside execution context (can access public only) */
export type GO<TI extends IDocTI> = GDoc<TI, 'outside'>