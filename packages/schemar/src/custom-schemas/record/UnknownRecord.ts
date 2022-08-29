// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { UnknownRecordImpl } from './unknown'

export type UnknownRecord = t.UnknownRecord

export const UnknownRecord = lazyConstructor(
	() => UnknownRecordImpl,
) as unknown as UnknownRecordConstructor

export type UnknownRecordConstructor = new () => UnknownRecord

export const record = lazyValue(() => new UnknownRecord())
