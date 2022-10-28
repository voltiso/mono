// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type } from '~/GetType'
import type { $$Schemable } from '~/Schemable'

import type { CustomUnion } from './CustomUnion'

// export type $Union<Ts extends $$Schemable[]> = Ts extends any
// 	? Union<Ts>
// 	: never

export type Union<Ts extends $$Schemable[]> = CustomUnion<{
	schemas: Ts
	Output: Ts extends any ? Type<Ts[number], { kind: 'out' }> : never
	Input: Ts extends any ? Type<Ts[number], { kind: 'in' }> : never
}>

//

export type UnionConstructor = new <Ts extends $$Schemable[]>(
	schemas: Ts,
) => Union<Ts>
