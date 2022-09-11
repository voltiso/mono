// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CallableWithThis, Newable, ReturnType_ } from '~/function'

import type { Instance } from './Instance'

export function callableClass<
	Class extends Newable,
	Func extends CallableWithThis<any[], unknown, Class>,
>(Cls: Class, func: Func): Class & Func {
	function Ctor(...args: ConstructorParameters<Class>): Instance<Class>
	function Ctor(...args: Parameters<Func>): ReturnType_<Func>

	function Ctor(
		...args: ConstructorParameters<Class> | Parameters<Func>
	): ReturnType_<Func> | Instance<Class> {
		if (typeof new.target === 'undefined')
			return func.call(Cls, ...args) as ReturnType_<Func>

		return Reflect.construct(Cls, args, new.target) as Instance<Class>
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Ctor.prototype = Cls.prototype

	return Object.setPrototypeOf(Ctor, Cls) as Class & Func
	// return protoLink(Ctor, Cls) as unknown as Class & Fun
}
