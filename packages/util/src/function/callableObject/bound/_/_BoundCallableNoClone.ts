// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BoundCallable,
	BoundCallableOptions,
	CustomBoundCallable,
	WithSelfBoundCALL,
} from '~/function'
import { CALL, CustomArrowCallable } from '~/function'

/** @internal */
export function _CustomBoundCallableNoClone<
	Options extends BoundCallableOptions,
>(options: Options): CustomBoundCallable<Options> {
	const { call, shape } = options

	const callable: CustomBoundCallable<Options> = CustomArrowCallable({
		call: (...args: any) => call.call(callable as never, ...(args as never[])),
		shape,
	}) as never

	return callable
}

export function _BoundCallableNoClone<This extends WithSelfBoundCALL>(
	self: This,
): BoundCallable<This> {
	// eslint-disable-next-line etc/no-internal
	return _CustomBoundCallableNoClone<any>({
		// eslint-disable-next-line security/detect-object-injection
		call: self[CALL],
		shape: self,
	}) as never
}
