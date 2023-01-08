// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BoundCallable,
	BoundCallableOptions,
	WithSelfBoundCALL,
} from '~/function'
import { ArrowCallable, CALL, isWithCALL } from '~/function'

/** @internal */
export function _BoundCallableNoClone<
	Options extends BoundCallableOptions | WithSelfBoundCALL,
>(options: Options): BoundCallable<Options> {
	const { call, shape } = isWithCALL(options)
		? // eslint-disable-next-line security/detect-object-injection
		  { call: options[CALL], shape: options }
		: options

	const callable: BoundCallable<Options> = ArrowCallable({
		call: (...args: any) => call.call(callable as never, ...(args as never[])),
		shape,
	}) as never

	return callable
}
