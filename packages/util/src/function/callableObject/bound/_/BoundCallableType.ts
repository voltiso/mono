// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithSelfBoundCALL } from '~/function'
import { CALL } from '~/function'

/** @internal Use `BoundCallable` instead */
// eslint-disable-next-line etc/underscore-internal
export interface IBoundCallable extends Function {
	clone(): unknown
	[CALL]?(...args: unknown[]): unknown
}

/** @internal Use `BoundCallable` instead */
export type _BoundCallable<
	Options extends {
		// have to explicitly declare the recursive type
		// eslint-disable-next-line etc/no-internal
		call(this: _BoundCallable<Options>, ...args: unknown[]): unknown
		shape: object
	},
> = Options['shape'] &
	Options['call'] &
	Record<Exclude<keyof CallableFunction, keyof Options['shape']>, never> & {
		clone(): object // _BoundCallable<Options>
	}

export type _BoundCallableWithCALL<T extends WithSelfBoundCALL> =
	// eslint-disable-next-line etc/no-internal
	_BoundCallable<{ call: T[CALL]; shape: T }>
