// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyObject } from '@voltiso/util'

import type { CustomAny, CustomAny$ } from '~'

import { AnyImpl } from './AnyImpl'

//

export interface Any extends CustomAny<{}> {}
export interface Any$ extends CustomAny$<{}> {}

export const Any$ = lazyConstructor(() => AnyImpl) as unknown as Any$Constructor

export type Any$Constructor = new () => Any$

//

export const any: Any$ = lazyObject(() => new Any$())
