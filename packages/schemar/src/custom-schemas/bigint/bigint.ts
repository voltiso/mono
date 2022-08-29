// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { BigintImpl } from './BigintImpl'

export type Bigint = t.Bigint

export const Bigint = lazyConstructor(
	() => BigintImpl,
) as unknown as t.BigintConstructor

export const bigint = lazyValue(() => new Bigint())
