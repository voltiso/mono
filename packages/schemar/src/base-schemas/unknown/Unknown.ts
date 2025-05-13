// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyObject } from '@voltiso/util'

import type { CustomUnknown, CustomUnknown$ } from '~'

import { UnknownImpl } from './UnknownImpl'

export interface Unknown extends CustomUnknown<{}> {}
export interface Unknown$ extends CustomUnknown$<{}> {}

export type Unknown$Constructor = new () => Unknown$

//

export const Unknown$ = lazyConstructor(
	() => UnknownImpl,
) as unknown as Unknown$Constructor

export const unknown = lazyObject(() => new Unknown$())
