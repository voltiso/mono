// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	CustomUnknownObject,
	DefaultUnknownObjectOptions,
	InferableObject,
} from '~'
import { UnknownObjectImpl } from '~'
import type * as s from '~/schemas'

export interface UnknownObject
	extends CustomUnknownObject<DefaultUnknownObjectOptions> {
	<S extends InferableObject>(shape: S): s.Object<S>
}

export const UnknownObject = lazyConstructor(
	() => UnknownObjectImpl,
) as unknown as UnknownObjectConstructor

type UnknownObjectConstructor = new () => UnknownObject

export const object = lazyValue(() => new UnknownObject())
