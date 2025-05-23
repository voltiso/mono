// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyFunction } from '@voltiso/util'

import type { InferableLiteral } from '~/types/Inferable/Inferable'

import type { Literal$ } from '../literal/Literal'
import { UnknownLiteralImpl } from './_/UnknownLiteralImpl'
import type {
	CustomUnknownLiteral,
	CustomUnknownLiteral$,
} from './CustomUnknownLiteral'

export interface UnknownLiteral extends CustomUnknownLiteral<{}> {}

export interface UnknownLiteral$ extends CustomUnknownLiteral$<{}> {
	<L extends InferableLiteral>(...literals: L[]): Literal$<L>
	<L extends InferableLiteral>(literals: Set<L>): Literal$<L>
	<L extends InferableLiteral>(...args: L[] | [Set<L>]): Literal$<L>
}

export type UnknownLiteral$Constructor = new () => UnknownLiteral$

//

export const UnknownLiteral$ = lazyConstructor(
	() => UnknownLiteralImpl,
) as unknown as UnknownLiteral$Constructor

//

export const literal: UnknownLiteral$ = lazyFunction(
	() => new UnknownLiteral$(),
)
