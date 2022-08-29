// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor, lazyValue } from '@voltiso/util'

import { UnknownLiteralImpl } from '~'

export type UnknownLiteral = t.UnknownLiteral

export const UnknownLiteral = lazyConstructor(
	() => UnknownLiteralImpl,
) as unknown as t.UnknownLiteralConstructor

//

export const literal: UnknownLiteral = lazyValue(() => new UnknownLiteral())
