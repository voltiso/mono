// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomUnknown } from '~'
import { UnknownImpl } from '~'

export interface Unknown extends CustomUnknown<{}> {}

export const Unknown = lazyConstructor(
	() => UnknownImpl,
) as unknown as UnknownConstructor

type UnknownConstructor = new () => Unknown

export const unknown = lazyValue(() => new Unknown())
