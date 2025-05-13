// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CallInfo } from '@voltiso/transform'

namespace MyNamespace {
	/** @callInfo */
	export function willAppend(_str: string, _info?: CallInfo): void {}
	export function willNotAppend(_str: string, _info?: CallInfo): void {}
}

namespace A {
	export namespace B {
		export class C {
			/** @callInfo */
			willAppend<X>(_x: X, _info?: CallInfo): void {}
			willNotAppend<X>(_x: X, _info?: CallInfo): void {}
		}
	}
}

const c = new A.B.C()

namespace Test {
	export function start(): void {
		MyNamespace.willAppend('a')
		MyNamespace.willNotAppend('a')

		c.willAppend<number>(1)
		c.willNotAppend('a')
	}
}

Test.start()
