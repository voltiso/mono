// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { CustomUnknownObject } from '~'

import { UnknownObjectImpl } from './_/UnknownObjectImpl'

export interface UnknownObject extends CustomUnknownObject<{}> {}

export type UnknownObjectConstructor = new () => UnknownObject

//

export interface UnknownPlainObject
	extends CustomUnknownObject<{
		isPlain: true
	}> {}

//

export const UnknownObject = lazyConstructor(
	() => UnknownObjectImpl,
) as unknown as UnknownObjectConstructor

export const object: UnknownObject = lazyValue(() => new UnknownObject())

export const plainObject: UnknownPlainObject = lazyValue(
	() => object.plain,
) as never
