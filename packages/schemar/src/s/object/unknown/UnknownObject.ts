// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { InferableObject } from '../../../schema'
import type * as s from '../..'
import type { DefaultUnknownObjectOptions } from './_/UnknownObjectOptions.js'
import type { CustomUnknownObject } from './CustomUnknownObject.js'
import { UnknownObject_ } from './UnknownObject_.js'

export interface UnknownObject
	extends CustomUnknownObject<DefaultUnknownObjectOptions> {
	<S extends InferableObject>(shape: S): s.Object<S>
}

export const UnknownObject = lazyConstructor(
	() => UnknownObject_,
) as unknown as UnknownObjectConstructor

type UnknownObjectConstructor = new () => UnknownObject

export const object = lazyValue(() => new UnknownObject())
