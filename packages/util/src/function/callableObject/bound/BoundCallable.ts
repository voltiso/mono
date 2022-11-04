// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $expect } from '~/$strip'
import type { WithCloneFunction } from '~/clone'
import type {
	_BoundCallable,
	_BoundCallableWithCALL,
	BoundCallableInputWithCALL,
	IBoundCallable,
} from '~/function'
import { _BoundCallableNoClone, isWithCALL } from '~/function'
import type { NoArgument } from '~/type'

import type { WithSelfBoundCALL } from '../CALL'
import { CALL } from '../CALL'
import type { BoundCallableOptions } from './BoundCallableOptions'

//

export type BoundCallable<
	Options extends
		| BoundCallableOptions
		| WithSelfBoundCALL
		| NoArgument = NoArgument,
> = Options extends NoArgument
	? // eslint-disable-next-line etc/no-internal
	  IBoundCallable
	: Options extends WithSelfBoundCALL
	? _BoundCallableWithCALL<Options>
	: Options extends BoundCallableOptions
	? // eslint-disable-next-line etc/no-internal
	  _BoundCallable<Options>
	: never

/**
 * Similar to `ArrowCallable`, but `this` of `func` is bound to self
 *
 * - ✅ Works with `clone`
 * - ✅ Binds `this` to self
 * - ❌ Does not work with `Proxy` (if needed, @see `Callable`)
 */
export function BoundCallable<
	Options extends BoundCallableOptions | BoundCallableInputWithCALL,
>(options: Options): BoundCallable<Options> {
	// eslint-disable-next-line etc/no-internal
	const callable = _BoundCallableNoClone(options)

	const { call, shape } = isWithCALL(options)
		? // eslint-disable-next-line security/detect-object-injection
		  { call: options[CALL], shape: options }
		: options

	// have to implement clone - need to rebind the callable to new `this`

	// own or prototypical
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const innerClone = typeof shape.clone === 'function' ? shape.clone : undefined

	// own
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor
	const ownCloneDescriptor = Object.getOwnPropertyDescriptor(callable, 'clone')

	function clone(this: BoundCallable<Options>) {
		if (innerClone) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			const newInstance: WithCloneFunction = (innerClone as any).call(
				this,
			) as never

			if (typeof newInstance === 'function') return newInstance // trust the provided `.clone()`

			// fix value returned by inner `.clone()`, if it's not callable
			return BoundCallable({
				call: call as never,
				shape: newInstance,
			})
		}

		// no inner `.clone()` - have to clone manually

		// eslint-disable-next-line @typescript-eslint/unbound-method
		$expect(this.clone).toBe(clone) // `clone` overridden in the meantime - not supported

		// build descriptors for an object passed as an argument to `BoundCallable`
		// (restore original inner `clone`)
		// eslint-disable-next-line es-x/no-object-getownpropertydescriptors
		const descriptors = Object.getOwnPropertyDescriptors(this)
		if (ownCloneDescriptor) descriptors.clone = ownCloneDescriptor as never
		else delete (descriptors as Partial<typeof descriptors>).clone

		const newInstance = {} as BoundCallable<Options>
		Object.setPrototypeOf(newInstance, Object.getPrototypeOf(this) as never)
		// eslint-disable-next-line es-x/no-object-defineproperties
		Object.defineProperties(newInstance, descriptors)

		return BoundCallable({
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
