// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

import type { Input_, Output_ } from '~/GetType'
import type { $$Schemable } from '~/Schemable'

import type { CustomIntersection } from './CustomIntersection'

export type Intersection<Ts extends $$Schemable[]> = CustomIntersection<{
	schemas: Ts

	Output: Intersection.GetOutput<Ts>
	Input: Intersection.GetInput<Ts>
}>

export namespace Intersection {
	export type SafeFlatten<T> = T extends (...args: any) => any ? T : _<T>

	export type GetOutput<Ts extends $$Schemable[]> = GetOutput.Rec<unknown, Ts>

	export namespace GetOutput {
		export type Rec<acc, Ts extends unknown[]> = Ts extends [
			infer T,
			...infer Ts,
		]
			? Rec<SafeFlatten<acc & Output_<T>>, Ts>
			: acc
	}

	export type GetInput<Ts extends $$Schemable[]> = GetInput.Rec<unknown, Ts>

	export namespace GetInput {
		export type Rec<acc, Ts extends unknown[]> = Ts extends [
			infer T,
			...infer Ts,
		]
			? Rec<SafeFlatten<acc & Input_<T>>, Ts>
			: acc
	}
}

//

export type IntersectionConstructor = new <Ts extends $$Schemable[]>(
	schemas: Ts,
) => Intersection<Ts>
