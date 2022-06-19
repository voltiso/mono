/* eslint-disable @typescript-eslint/ban-types */
import { lazyValue } from '@voltiso/ts-util'
import { CustomNumber } from './CustomNumber'
import { DefaultNumberOptions } from './_/NumberOptions'
import { Number_ } from './Number_'
import * as s from '..'

export interface Number extends CustomNumber<DefaultNumberOptions> {
	<L extends number>(...literals: L[]): s.Literal<L>
	<L extends number>(literals: Set<L>): s.Literal<L>
	<L extends number>(...args: L[] | [Set<L>]): s.Literal<L>
}

export const Number = Number_ as unknown as NumberConstructor

type NumberConstructor = new () => Number

//

export const number = lazyValue(() => new Number())
export const integer = lazyValue(() => number.integer)
