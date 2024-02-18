// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CallInfo } from '@voltiso/transform'

namespace MyNamespace {
	/** @callInfo */
	export function willAppend(_str: string, _info?: CallInfo) {
		//
	}

	export function willNotAppend(_str: string, _info?: CallInfo) {
		//
	}
}

namespace A {
	export namespace B {
		export class C {
			/** @callInfo */
			// eslint-disable-next-line class-methods-use-this
			willAppend<X>(_x: X, _info?: CallInfo) {
				//
			}

			// eslint-disable-next-line class-methods-use-this
			willNotAppend<X>(_x: X, _info?: CallInfo) {
				//
			}
		}
	}
}

const c = new A.B.C()

namespace Test {
	export function start() {
		MyNamespace.willAppend('a')
		MyNamespace.willNotAppend('a')

		c.willAppend<number>(1)
		c.willNotAppend('a')
	}
}

Test.start()
