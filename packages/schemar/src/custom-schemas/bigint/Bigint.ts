// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomBigint } from '~'
import { BigintImpl } from '~'
import type * as s from '~/custom-schemas/index'

export interface Bigint extends CustomBigint<{}> {
	<L extends bigint>(...literals: L[]): s.Literal<L>
	<L extends bigint>(literals: Set<L>): s.Literal<L>
	<L extends bigint>(...args: L[] | [Set<L>]): s.Literal<L>
}

export const Bigint = lazyConstructor(
	() => BigintImpl,
) as unknown as BigintConstructor

type BigintConstructor = new () => Bigint

export const bigint = lazyValue(() => new Bigint())
