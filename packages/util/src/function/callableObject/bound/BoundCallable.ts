// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $expect } from '_'

import type { CloneOptions, WithCloneFunction } from '~/clone'
import type {
	_BoundCallable,
	_BoundCallableWithCALL,
	BoundCallableInputWithCALL,
} from '~/function'
import { _CustomBoundCallableNoClone } from '~/function'
import type { NonStrictPartial } from '~/object'

import type { WithSelfBoundCALL } from '../CALL'
import { CALL } from '../CALL'
import type { BoundCallableOptions } from './BoundCallableOptions'

//

export type BoundCallable<This extends WithSelfBoundCALL> =
	_BoundCallableWithCALL<This>

export type CustomBoundCallable<Options extends BoundCallableOptions> =
	// eslint-disable-next-line etc/no-internal
	_BoundCallable<Options>

/**
 * Similar to `ArrowCallable`, but `this` of `func` is bound to self
 *
 * - ✅ Works with `clone`
 * - ✅ Binds `this` to self
 * - ❌ Does not work with `Proxy` (if needed, @see `Callable`)
 */
export function CustomBoundCallable<Options extends BoundCallableOptions>(
	options: Options,
): CustomBoundCallable<Options> {
	// eslint-disable-next-line etc/no-internal
	const callable = _CustomBoundCallableNoClone(options)

	const { call, shape } = options

	// have to implement clone - need to rebind the callable to new `this`

	// own or prototypical

	const innerClone = typeof shape.clone === 'function' ? shape.clone : undefined

	// own

	const ownCloneDescriptor = Object.getOwnPropertyDescriptor(callable, 'clone')

	function clone(
		this: CustomBoundCallable<Options>,
		options?: NonStrictPartial<CloneOptions> | undefined,
	) {
		if (innerClone) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			const newInstance: WithCloneFunction = (innerClone as any).call(
				this,
				options,
			) as never

			if (typeof newInstance === 'function') return newInstance // trust the provided `.clone()`

			// fix value returned by inner `.clone()`, if it's not callable
			return CustomBoundCallable({
				call: call as never,
				shape: newInstance,
			})
		}

		// no inner `.clone()` - have to clone manually

		// eslint-disable-next-line @typescript-eslint/unbound-method
		$expect(this.clone).toBe(clone) // `clone` overridden in the meantime - not supported

		// build descriptors for an object passed as an argument to `BoundCallable`
		// (restore original inner `clone`)

		const descriptors = Object.getOwnPropertyDescriptors(this)

		if (ownCloneDescriptor) descriptors.clone = ownCloneDescriptor as never
		else delete (descriptors as Partial<typeof descriptors>).clone

		// eslint-disable-next-line unicorn/consistent-destructuring
		for (const key of options?.omit ?? []) {
			delete descriptors[key as never]
		}

		const newInstance = {} as CustomBoundCallable<Options>
		Object.setPrototypeOf(newInstance, Object.getPrototypeOf(this) as never)

		Object.defineProperties(newInstance, descriptors)

		return CustomBoundCallable({
			call: call as never,
			shape: newInstance,
		})
	}

	Object.defineProperty(callable, 'clone', {
		value: clone,
		writable: false,
		enumerable: false,
	})

	return callable as never
}

//

export function BoundCallable<Self extends BoundCallableInputWithCALL>(
	self: Self,
): BoundCallable<Self> {
	return CustomBoundCallable<any>({ call: self[CALL], shape: self }) as never
}

export function BoundCallable_<Self>(
	self: Self,
): Self extends BoundCallableInputWithCALL ? BoundCallable<Self> : never {
	return BoundCallable(self as never)
}
