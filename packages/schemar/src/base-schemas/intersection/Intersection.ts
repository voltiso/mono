// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type { $$Schemable, CustomIntersection, Input_, Output_ } from '~'
import { isIntersectionSchema } from '~'

import { IntersectionImpl } from './_/IntersectionImpl'

export type Intersection<Ts extends $$Schemable[]> = CustomIntersection<{
	schemas: Ts

	Output: IntersectionDetail.GetOutput<Ts>
	Input: IntersectionDetail.GetInput<Ts>
}>

export namespace IntersectionDetail {
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

export const Intersection = lazyConstructor(
	() => IntersectionImpl,
) as unknown as IntersectionConstructor

//

export function and<Ts extends $$Schemable[]>(...types: Ts): Intersection<Ts> {
	let ts = [] as $$Schemable[]

	for (const type of types) {
		if (isIntersectionSchema(type)) ts = [...ts, ...type.getSchemas]
		else ts.push(type)
	}

	// $assert(ts.length >= 2)
	return new Intersection(ts as never) as never
}
