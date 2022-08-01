// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Instance } from '~'

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
