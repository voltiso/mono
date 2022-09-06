// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject } from '~/Inferable'

import type { Object } from '../Object'
import type { CustomUnknownObject } from './CustomUnknownObject'

export interface UnknownObject extends CustomUnknownObject<{}> {
	// eslint-disable-next-line @typescript-eslint/ban-types
	<S extends InferableObject>(shape: S): Object<S>
}

export type UnknownObjectConstructor = new () => UnknownObject
