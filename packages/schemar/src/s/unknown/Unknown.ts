// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import type { DefaultUnknownOptions } from './_/UnknownOptions.js'
import type { CustomUnknown } from './CustomUnknown.js'
import { Unknown_ } from './Unknown_.js'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Unknown extends CustomUnknown<DefaultUnknownOptions> {}

export const Unknown = Unknown_ as unknown as UnknownConstructor

type UnknownConstructor = new () => Unknown

export const unknown = lazyValue(() => new Unknown())
