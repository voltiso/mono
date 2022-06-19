/* eslint-disable @typescript-eslint/ban-types */
import { Boolean_ } from './Boolean_'
import * as s from '..'
import { lazyValue } from '@voltiso/ts-util'

export interface Boolean extends Boolean_ {
	<L extends boolean>(...literals: L[]): s.Literal<L>
	<L extends boolean>(literals: Set<L>): s.Literal<L>
	<L extends boolean>(...args: L[] | [Set<L>]): s.Literal<L>
}

export const Boolean = Boolean_ as unknown as BooleanConstructor

type BooleanConstructor = new () => Boolean

export const boolean: Boolean = lazyValue(() => new Boolean())
