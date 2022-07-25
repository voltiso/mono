import type { Instance } from '../index.js'

export function isInstanceOf<
	DerivedInstance extends object,
	BaseConstructor extends abstract new (...args: any[]) => object,
>(
	derived: DerivedInstance,
	Base: BaseConstructor,
): derived is DerivedInstance & Instance<BaseConstructor> {
	while (Base.name.startsWith('lazyConstructor'))
		Base = Object.getPrototypeOf(Base)
	return derived instanceof Base
}
