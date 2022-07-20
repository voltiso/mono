// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from '@voltiso/util'

import type * as s from '..'
import { Boolean_ } from './Boolean_.js'

export interface Boolean extends Boolean_ {
	<L extends boolean>(...literals: L[]): s.Literal<L>
	<L extends boolean>(literals: Set<L>): s.Literal<L>
	<L extends boolean>(...args: L[] | [Set<L>]): s.Literal<L>
}

export const Boolean = Boolean_ as unknown as BooleanConstructor

type BooleanConstructor = new () => Boolean

// eslint-disable-next-line no-new-wrappers
export const boolean: Boolean = lazyValue(() => new Boolean())
