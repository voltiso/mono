// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema } from '~/Schema/ISchema'

import type { SchemarAnd } from './ops/SchemarAnd'
import type { SchemarOr } from './ops/SchemarOr'

/**
 * Custom schemar operators
 *
 * - Extend using _module augmentation_
 */
export interface SchemarOp<A extends $$Schema, B extends $$Schema> {
	or: SchemarOr<A, B>
	and: SchemarAnd<A, B>
}
