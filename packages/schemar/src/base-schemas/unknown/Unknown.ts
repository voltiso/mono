// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomUnknown } from '~'

import { UnknownImpl } from './UnknownImpl'

export interface Unknown extends CustomUnknown<{}> {}

export type UnknownConstructor = new () => Unknown

//

export const Unknown = lazyConstructor(
	() => UnknownImpl,
) as unknown as UnknownConstructor

export const unknown = lazyValue(() => new Unknown())
