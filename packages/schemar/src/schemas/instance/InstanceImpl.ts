// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomInstanceImpl, defaultInstanceOptions } from '~'

export class InstanceImpl<T extends object> extends CustomInstanceImpl<{}> {
	constructor(constructor: abstract new (...args: never[]) => T) {
		while (constructor.name.startsWith('lazyConstructor'))
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-param-reassign
			constructor = Object.getPrototypeOf(constructor)

		super({ ...defaultInstanceOptions, constructor } as never)
	}
}
