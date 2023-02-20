// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyFunction } from '@voltiso/util'

import type { CustomUnknownObject, CustomUnknownObject$ } from '~'

import { UnknownObjectImpl } from './_/UnknownObjectImpl'

export interface UnknownObject extends CustomUnknownObject<{}> {}
export interface UnknownObject$ extends CustomUnknownObject$<{}> {}

//

export interface UnknownPlainObject
	extends CustomUnknownObject<{
		isPlain: true
	}> {}

export interface UnknownPlainObject$
	extends CustomUnknownObject$<{
		isPlain: true
	}> {}

//

export const UnknownObject$ = lazyConstructor(
	() => UnknownObjectImpl,
) as unknown as UnknownObject$Constructor

export type UnknownObject$Constructor = new () => UnknownObject$

export const object: UnknownObject$ = lazyFunction(() => new UnknownObject$())

export const plainObject: UnknownPlainObject$ = lazyFunction(
	() => object.plain,
) as never
