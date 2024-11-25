// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { WithSelfBoundCALL } from '~/function'
import { CALL } from '~/function'

/** @internal Use `BoundCallable` instead */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export interface IBoundCallable extends Function {
	clone(): unknown
	[CALL]?(...args: unknown[]): unknown
	(...args: unknown[]): unknown
}

/** @internal Use `BoundCallable` instead */
export type _BoundCallable<
	Options extends {
		// have to explicitly declare the recursive type
		call(this: _BoundCallable<Options>, ...args: unknown[]): unknown
		shape: object
	},
> = Options['shape'] &
	Options['call'] &
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	Function & {
		// Record<Exclude<keyof CallableFunction, keyof Options['shape']>, never> & // ! need bind-call-apply for react-native
		clone(): object // _BoundCallable<Options>
	}

export type _BoundCallableWithCALL<T extends WithSelfBoundCALL> =
	_BoundCallable<{ call: T[CALL]; shape: T }>
