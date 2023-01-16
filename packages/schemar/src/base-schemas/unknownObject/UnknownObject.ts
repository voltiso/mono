// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomUnknownObject, CustomUnknownObject$ } from '~'

import { UnknownObjectImpl } from './_/UnknownObjectImpl'

export interface UnknownObject extends CustomUnknownObject<{}> {}
export interface UnknownObject$ extends CustomUnknownObject$<{}> {}

//

export interface UnknownPlainObject
	extends CustomUnknownObject<{
		isPlain: true
	}> {}

//

export const UnknownObject$ = lazyConstructor(
	() => UnknownObjectImpl,
) as unknown as UnknownObject$Constructor

export type UnknownObject$Constructor = new () => UnknownObject$

export const object: UnknownObject$ = lazyValue(() => new UnknownObject$())

export const plainObject: UnknownPlainObject = lazyValue(
	() => object.plain,
) as never
