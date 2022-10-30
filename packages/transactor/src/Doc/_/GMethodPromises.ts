// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTI } from '~/Doc'

/** @inline */
export type Promisify<F> = F extends (...args: never[]) => PromiseLike<unknown>
	? F
	: F extends (...args: infer Args) => infer R
	? (...args: Args) => PromiseLike<R>
	: never

/** @inline */
type OTP<F> = F extends (...args: infer Args) => infer R
	? (...args: Args) => R
	: never

/** @inline */
export type GetMethodPromises_<TI> = TI extends DocTI
	? {
			[k in keyof TI['methods']]: Promisify<OTP<TI['methods'][k]>>
	  }
	: never
