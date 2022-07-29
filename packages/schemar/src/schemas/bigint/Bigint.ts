// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type * as s from '../index'
import type { DefaultBigintOptions } from './_/BigintOptions.js'
import { Bigint_ } from './Bigint_.js'
import type { CustomBigint } from './CustomBigint.js'

export interface Bigint extends CustomBigint<DefaultBigintOptions> {
	<L extends bigint>(...literals: L[]): s.Literal<L>
	<L extends bigint>(literals: Set<L>): s.Literal<L>
	<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L>
}

export const Bigint = Bigint_ as unknown as BigintConstructor

type BigintConstructor = new () => Bigint

export const bigint = lazyValue(() => new Bigint())
