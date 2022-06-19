import { lazyValue } from '@voltiso/ts-util'
import { InferableObject } from '../../../schema'
import { CustomUnknownObject } from './CustomUnknownObject'
import { DefaultUnknownObjectOptions } from './_/UnknownObjectOptions'
import * as s from '../..'
import { UnknownObject_ } from './UnknownObject_'
import { lazyConstructor } from '@voltiso/ts-util/class'

export interface UnknownObject
	extends CustomUnknownObject<DefaultUnknownObjectOptions> {
	<S extends InferableObject>(shape: S): s.Object<S>
}

export const UnknownObject = lazyConstructor(
	() => UnknownObject_
) as unknown as UnknownObjectConstructor

type UnknownObjectConstructor = new () => UnknownObject

export const object = lazyValue(() => new UnknownObject())
