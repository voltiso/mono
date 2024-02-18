// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomInstanceImpl } from './CustomInstanceImpl'
import { defaultInstanceOptions } from './defaultInstanceOptions'

export class InstanceImpl<T extends object> extends lazyConstructor(
	() => CustomInstanceImpl,
)<{}> {
	constructor(Constructor: abstract new (...args: never[]) => T) {
		while (Constructor.name.startsWith('lazyConstructor'))
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-param-reassign
			Constructor = Object.getPrototypeOf(Constructor)

		super({ ...defaultInstanceOptions, Constructor } as never)
	}
}
