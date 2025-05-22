// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { Callable, Newable } from '~/function'
import type { DeepMutableN } from '~/object'
import type { Primitive } from '~/primitive'

import type { Override } from '../object/Override'
import type { AlsoAccept } from './AlsoAccept'
import type { DecrementArgument } from './number'
import { UNSET } from '_/symbols/unset'

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
	Skip: UNSET | AlsoAccept<unknown>
}

export interface DefaultDefineTypeOptions extends DefineTypeOptions {
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
