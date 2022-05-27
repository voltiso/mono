import { CallableWithThis, Newable, Return } from '../function'
import { Instance } from './Instance'

export function callableClass<Class extends Newable, Fun extends CallableWithThis<never[], unknown, Class>>(
	Cls: Class,
	fun: Fun
): Class & Fun {
	function Ctor(...args: ConstructorParameters<Class>): Instance<Class>
	function Ctor(...args: Parameters<Fun>): Return<Fun>

	function Ctor(...args: ConstructorParameters<Class> | Parameters<Fun>): Return<Fun> | Instance<Class> {
		if (typeof new.target === 'undefined') return fun.call(Cls, ...args) as Return<Fun>
		else return Reflect.construct(Cls, args, new.target) as Instance<Class>
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	Ctor.prototype = Cls.prototype

	return Object.setPrototypeOf(Ctor, Cls) as Class & Fun
	// return protoLink(Ctor, Cls) as unknown as Class & Fun
}
