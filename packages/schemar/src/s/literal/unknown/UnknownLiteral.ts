// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { InferableLiteral } from '../../../schema'
import type * as s from '../..'
import type { DefaultUnknownLiteralOptions } from './_/UnknownLiteralOptions.js'
import type { CustomUnknownLiteral } from './CustomUnknownLiteral.js'
import { UnknownLiteral_ } from './UnknownLiteral_.js'

export interface UnknownLiteral
	extends CustomUnknownLiteral<DefaultUnknownLiteralOptions> {
	<L extends InferableLiteral>(...literals: L[]): s.Literal<L>
	<L extends InferableLiteral>(literals: Set<L>): s.Literal<L>
	<L extends InferableLiteral>(...args: L[] | [Set<L>]): s.Literal<L>
}

export const UnknownLiteral =
	UnknownLiteral_ as unknown as UnknownLiteralConstructor

type UnknownLiteralConstructor = new () => UnknownLiteral

//

export const literal: UnknownLiteral = lazyValue(() => new UnknownLiteral())
