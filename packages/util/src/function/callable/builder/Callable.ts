// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoThis } from '~/function'

import type { CallableOptions, GetCallableOptions } from './CallableOptions'

export type Callable<O extends Partial<CallableOptions> = {}> =
	GetCallableOptions<O>['this'] extends NoThis
		? (
				...args: GetCallableOptions<O>['arguments']
		  ) => GetCallableOptions<O>['return']
		: (
				this: GetCallableOptions<O>['this'],
				...args: GetCallableOptions<O>['arguments']
		  ) => GetCallableOptions<O>['return']
