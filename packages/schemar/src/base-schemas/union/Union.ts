// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { $$Schemable, CustomUnion, Type } from '~'

import { UnionImpl } from './_'

export type Union<Ts extends $$Schemable[]> = CustomUnion<{
	schemas: Ts
	Output: Ts extends any ? Type<Ts[number], { kind: 'out' }> : never
	Input: Ts extends any ? Type<Ts[number], { kind: 'in' }> : never
}>

//

export type UnionConstructor = new <Ts extends $$Schemable[]>(
	schemas: Ts,
) => Union<Ts>

//

export const Union = lazyConstructor(
	() => UnionImpl,
) as unknown as UnionConstructor
