// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsAny } from '~/any'
import type { NoThis } from '~/function'

import type { CallableOptions, GetCallableOptions } from './CallableOptions'

export type Callable<O extends Partial<CallableOptions> = {}> =
	GetCallableOptions<O>['this'] extends NoThis
		? (
				...args: Callable.FixParameters<GetCallableOptions<O>['parameters']>
			) => GetCallableOptions<O>['return']
		: (
				this: GetCallableOptions<O>['this'],
				...args: Callable.FixParameters<GetCallableOptions<O>['parameters']>
			) => GetCallableOptions<O>['return']

export type Callable_<O> =
	O extends Partial<CallableOptions> ? Callable<O> : never

export namespace Callable {
	/**
	 * Apply some fixes to make type inference work better
	 *
	 * - Remove `readonly` from the whole parameters array
	 * - Do not touch `any` parameters
	 */
	export type FixParameters<P extends readonly unknown[]> =
		IsAny<P> extends true ? any : [...P]
}
