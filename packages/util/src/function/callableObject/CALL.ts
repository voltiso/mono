// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { Callable } from '../callable'

//

declare global {
	namespace Voltiso {
		const CALL: unique symbol
		type CALL = typeof CALL
		// type CALL = { readonly _: unique symbol }['_']
		// const CALL: CALL
	}
}
globalThis.Voltiso ??= {} as never
;(Voltiso.CALL as any) ??= Symbol.for('@voltiso/util/CALL')
export type CALL = Voltiso.CALL
export const CALL: CALL = Voltiso.CALL
//

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
