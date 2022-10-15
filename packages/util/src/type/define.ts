// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepMutableX_ } from '~/object'

import type { DecrementArgument } from './number'

// eslint-disable-next-line etc/no-misused-generics, no-magic-numbers
export function define<T, Depth extends DecrementArgument = 10>() {
	function value<Inferred extends T>(
		value: Inferred,
	): DeepMutableX_<Inferred, Depth> {
		return value as never
	}

	return { value }
}
