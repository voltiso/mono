import { lazyValue } from '@voltiso/ts-util'
import { InferableLiteral } from '../../../schema'
import { CustomUnknownLiteral } from './CustomUnknownLiteral'
import { DefaultUnknownLiteralOptions } from './_/UnknownLiteralOptions'
import * as s from '../..'
import { UnknownLiteral_ } from './UnknownLiteral_'

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
