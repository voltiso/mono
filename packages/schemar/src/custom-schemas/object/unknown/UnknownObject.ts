// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type {
	CustomUnknownObject,
	DefaultUnknownObjectOptions,
	InferableObject,
	Object,
} from '~'
import { UnknownObjectImpl } from '~'

export interface UnknownObject
	extends CustomUnknownObject<DefaultUnknownObjectOptions> {
	// eslint-disable-next-line @typescript-eslint/ban-types
	<S extends InferableObject>(shape: S): Object<S>
}

export const UnknownObject = lazyConstructor(
	() => UnknownObjectImpl,
) as unknown as UnknownObjectConstructor

type UnknownObjectConstructor = new () => UnknownObject

export const object = lazyValue(() => new UnknownObject())
