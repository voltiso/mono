import type { InferableObject } from '~/Inferable'
import type { CustomUnknownObject } from './CustomUnknownObject'
import type { Object } from '../Object'

export interface UnknownObject extends CustomUnknownObject<{}> {
	// eslint-disable-next-line @typescript-eslint/ban-types
	<S extends InferableObject>(shape: S): Object<S>
}

export type UnknownObjectConstructor = new () => UnknownObject
