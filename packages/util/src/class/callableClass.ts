// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CallableWithThis, Newable, Return } from '../function'
import type { Instance } from './Instance.js'

export function callableClass<
	Class extends Newable,
	Func extends CallableWithThis<never[], unknown, Class>,
>(Cls: Class, func: Func): Class & Func {
	function Ctor(...args: ConstructorParameters<Class>): Instance<Class>
	function Ctor(...args: Parameters<Func>): Return<Func>

	function Ctor(
		...args: ConstructorParameters<Class> | Parameters<Func>
	): Return<Func> | Instance<Class> {
		if (typeof new.target === 'undefined')
			return func.call(Cls, ...args) as Return<Func>

		return Reflect.construct(Cls, args, new.target) as Instance<Class>
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Ctor.prototype = Cls.prototype

	return Object.setPrototypeOf(Ctor, Cls) as Class & Func
	// return protoLink(Ctor, Cls) as unknown as Class & Fun
}
