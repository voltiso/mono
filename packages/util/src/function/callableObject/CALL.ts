// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Callable } from '../callable'

//

export const CALL = Symbol('CALL')
export type CALL = typeof CALL

//

export interface WithCALL<Call extends Callable = Callable> {
	readonly [CALL]: Call
}

export interface WithSelfBoundCALL {
	[CALL](this: this, ...args: any): unknown
}

export interface WithBoundCALL<BoundThis> {
	[CALL](this: BoundThis, ...args: any): unknown
}

//

export function isWithCALL(x: unknown): x is WithCALL {
	return typeof (x as WithCALL | null)?.[CALL] === 'function'
}
