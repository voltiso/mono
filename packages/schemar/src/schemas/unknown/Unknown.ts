// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { CustomUnknown, DefaultUnknownOptions } from '~'
import { UnknownImpl } from '~'

export interface Unknown extends CustomUnknown<DefaultUnknownOptions> {}

export const Unknown = UnknownImpl as unknown as UnknownConstructor

type UnknownConstructor = new () => Unknown

export const unknown = lazyValue(() => new Unknown())
