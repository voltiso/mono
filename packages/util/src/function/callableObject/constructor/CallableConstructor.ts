// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CallableConstructorOptions } from './CallableConstructorOptions'

export type CallableConstructor<O extends CallableConstructorOptions> =
	O['constructor'] & O['call']

/**
 * Creates a constructor that has a separate call implementation when called
 * instead of constructed
 *
 * - Checks if `new.target` is defined to decide whether to use original construct
 *   function, or the provided call function
 */
export function CallableConstructor<O extends CallableConstructorOptions>(
	options: O,
): CallableConstructor<O> {
	// function CallableConstructor(
	// 	...args: ConstructorParameters<O['constructor']>
	// ): InstanceType<O['constructor']>

	// function CallableConstructor(
	// 	...args: Parameters<O['call']>
	// ): ReturnType<O['call']>

	const name = `CallableConstructor(${options.constructor.name})`

	function CallableConstructor(
		...args: ConstructorParameters<O['constructor']> | Parameters<O['call']>
	): ReturnType<O['call']> | InstanceType<O['constructor']> {
		if (typeof new.target === 'undefined')
			return Reflect.apply(
				options.call,
				options.constructor,
				args,
			) as ReturnType<O['call']>

		return Reflect.construct(
			options.constructor,
			args,
			new.target,
		) as InstanceType<O['constructor']>
	}

	Object.defineProperty(CallableConstructor, 'name', { value: name })
	// CallableConstructor.name = name

	CallableConstructor.prototype = options.constructor.prototype

	Object.setPrototypeOf(CallableConstructor, options.constructor)

	return CallableConstructor as never
}
