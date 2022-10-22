// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable, Newable } from '~/function'
import type { DeepMutableN } from '~/object'
import type { Primitive } from '~/primitive'

import type { AlsoAccept } from './AlsoAccept'
import type { ApplyOverrides } from './ApplyOverrides'
import type { DecrementArgument } from './number'
import type { NotProvided } from './optional-argument'

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
	Skip: NotProvided | AlsoAccept<unknown>
}

export interface DefaultDefineTypeOptions extends DefineTypeOptions {
	// eslint-disable-next-line no-magic-numbers
	MakeMutableDepth: 10
	Skip: Primitive | Callable | Newable
}

// eslint-disable-next-line etc/no-misused-generics
export function define<T, Options extends Partial<DefineTypeOptions> = {}>(): {
	value: <Inferred extends T>(
		value: Inferred,
	) => DeepMutableN<
		ApplyOverrides<DefaultDefineTypeOptions, Options>['MakeMutableDepth'],
		Inferred,
		{
			skip: NotProvided
		}
	>
} {
	return { value: x => x as never }
}
