import { lazyValue } from '@voltiso/ts-util'
import { CustomBigint } from './CustomBigint'
import { DefaultBigintOptions } from './_/BigintOptions'
import * as s from '..'
import { Bigint_ } from './Bigint_'

export interface Bigint extends CustomBigint<DefaultBigintOptions> {
	<L extends bigint>(...literals: L[]): s.Literal<L>
	<L extends bigint>(literals: Set<L>): s.Literal<L>
	<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L>
}

export const Bigint = Bigint_ as unknown as BigintConstructor

type BigintConstructor = new () => Bigint

export const bigint = lazyValue(() => new Bigint())
