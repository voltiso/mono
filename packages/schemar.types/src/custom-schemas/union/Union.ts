// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '~/GetType'
import type { SchemableLike } from '~/Schemable'

import type { CustomUnion } from './CustomUnion'

export type $Union<Ts extends SchemableLike[]> = Ts extends any
	? Union<Ts>
	: never

export type Union<Ts extends SchemableLike[]> = CustomUnion<{
	schemas: Ts
	Output: Type_<Ts[number], { kind: 'out' }>
	Input: Type_<Ts[number], { kind: 'in' }>
}>

//

export type UnionConstructor = new <Ts extends SchemableLike[]>(
	schemas: Ts,
) => Union<Ts>
