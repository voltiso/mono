// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable, Newable } from '~/function'
import type { DeepMutableN } from '~/object'
import type { Primitive } from '~/primitive'

import type { AlsoAccept } from './AlsoAccept'
import type { Override } from './ApplyOverrides'
import type { DecrementArgument } from './number'
import type { NoArgument } from './optional-argument'

export interface DefineTypeOptions {
	/**
	 * `Depth` argument passed to `DeepMutableN`
	 *
	 * - Type-only
	 *
	 * @defaultValue 10
	 */
	MakeMutableDepth: DecrementArgument

	/**
	 * Skip nested sub-types of `Skip`
	 *
	 * - Passed to `DeepMutableN`
	 * - Type-only
	 */
	Skip: NoArgument | AlsoAccept<unknown>
}

export interface DefaultDefineTypeOptions extends DefineTypeOptions {
	// eslint-disable-next-line no-magic-numbers
	MakeMutableDepth: 10
	Skip: Primitive | Callable | Newable
}

/** A nice little helper that does what `satisfies` keyword will do */
export function define<T, Options extends Partial<DefineTypeOptions> = {}>(): {
	value: <Inferred extends T>(
		value: Inferred,
	) => DeepMutableN<
		Override<DefaultDefineTypeOptions, Options>['MakeMutableDepth'],
		Inferred,
		{
			skip: Override<DefaultDefineTypeOptions, Options>['Skip']
		}
	>
} {
	return { value: x => x as never }
}
