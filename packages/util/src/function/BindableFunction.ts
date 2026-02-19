// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, UNSET } from '_'

import type { ArrayPrefix } from '~/array/ArrayPrefix'
import type { Printable } from '~/string'
import type { AlsoAccept } from '~/type'

import type { Callable } from './callable'
import type { CallableParameters_ } from './Parameters'
import type { CallableReturn_ } from './Return'

/** @internal */
export class _BindableFunction<
	Func extends Callable,
	BoundThis extends UNSET | AlsoAccept<unknown>,
	BoundArguments extends readonly unknown[],
> {
	readonly function: Func

	/**
	 * Currently bound `this`
	 *
	 * - Not read-only - can reassign `this`
	 *
	 *   - Notable use case: create self-referencing `BindableFunction`
	 */
	boundThis: BoundThis
	readonly boundArguments: BoundArguments

	get name(): string {
		return `BindableFunction(${this.function.name})`
	}

	toString(): string {
		const thisStr =
			this.boundThis === UNSET ? 'UNSET' : (this.boundThis as string)
		const params: string[] = [
			thisStr,
			...this.boundArguments.map(arg => `${arg as Printable}`),
		]

		return `BindableFunction(${params.join(', ')})\n${this.function.toString()}`
	}

	constructor(
		func: Func,
		boundThis: BoundThis = UNSET as never,
		...boundArguments: BoundArguments
	) {
		this.function = func
		this.boundThis = boundThis
		this.boundArguments = boundArguments

		// eslint-disable-next-line unicorn/no-this-assignment, consistent-this, @typescript-eslint/no-this-alias
		const self = this

		const name = this.name

		const bindableFunctionCall = {
			[name](this: BoundThis, ...args: BoundArguments) {
				const finalThis = self.boundThis !== UNSET ? self.boundThis : this
				const finalArgs = [...self.boundArguments, ...args]
				// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
				return Reflect.apply(self.function, finalThis, finalArgs) as never
			},
		}[name]

		Object.defineProperties(bindableFunctionCall, {
			length: { value: func.length - boundArguments.length },
		})

		$fastAssert(bindableFunctionCall?.name === name)

		Object.setPrototypeOf(bindableFunctionCall, this)

		// eslint-disable-next-line no-constructor-return
		return bindableFunctionCall as never

		// return new Proxy(bindableFunctionCall, {
		// 	get: (target, property, receiver) => {
		// 		if(property in target) return Reflect.get(target,property, receiver)
		// 		else return Reflect.get()
		// 	}
		// })
	}

	//

	bind<BindThis extends ThisParameterType<Func>>(
		thisArg: BindThis,
	): BoundFunction<Func, { this: BindThis }>

	bind<
		BindThis extends ThisParameterType<Func>,
		BindArguments extends ArrayPrefix<Parameters<Func>>,
	>(
		thisArg: BindThis,
		...args: BindArguments
	): BoundFunction<Func, { this: BindThis; argumentsPrefix: BindArguments }>

	bind<
		BindThis extends ThisParameterType<Func>,
		BindArguments extends ArrayPrefix<Parameters<Func>>,
	>(thisArg: BindThis, ...args: BindArguments): unknown {
		return new _BindableFunction(this.function, thisArg, ...args)
	}

	//

	unbind(): UnboundFunction<Func> {
		return new _BindableFunction(this.function) as never
	}

	//

	clone(): _BindableFunction<Func, BoundThis, [...BoundArguments]> {
		const result = new _BindableFunction(
			this.function,
			this.boundThis,
			...this.boundArguments,
		)

		if (this.boundThis === (this as never)) result.boundThis = result as never // properly clone self-referencing instances

		return result
	}
}

export const BindableFunction =
	_BindableFunction as unknown as BindableFunctionConstructor

export type BindableFunction<
	Func extends Callable,
	BoundThis,
	BoundArguments extends readonly unknown[],
> = _BindableFunction<Func, BoundThis, BoundArguments> &
	BoundFunctionCall<Func, BoundThis, BoundArguments>

export interface BindableFunctionConstructor {
	/** Unbound */
	new <Func extends Callable>(func: Func): BindableFunction<Func, UNSET, []>

	/** Bound `this` */
	new <Func extends Callable, BoundThis>(
		func: Func,
		boundThis: BoundThis,
	): BindableFunction<Func, BoundThis, []>

	/** Bound `this` and arguments list prefix */
	new <
		Func extends Callable,
		BoundThis,
		BoundArguments extends readonly unknown[],
	>(
		func: Func,
		boundThis: BoundThis,
		boundArguments: BoundArguments,
	): BindableFunction<Func, BoundThis, BoundArguments>
}

Object.setPrototypeOf(_BindableFunction.prototype, Function.prototype) // inherit call, apply, ...

//

export type BoundFunctionCall<
	Func,
	_BoundThis,
	BoundArguments extends readonly unknown[],
> = BoundArguments extends []
	? Func
	: (
			...args: BoundFunctionParameters<Func, BoundArguments>
		) => CallableReturn_<Func>

export type _BoundFunctionParametersRec<
	AllArguments extends readonly unknown[],
	BoundArguments extends readonly unknown[],
> = BoundArguments extends []
	? AllArguments
	: BoundArguments extends [unknown, ...infer Bs]
		? AllArguments extends [unknown, ...infer As]
			? _BoundFunctionParametersRec<As, Bs>
			: never
		: never

export type BoundFunctionParameters<
	Func,
	BoundArguments extends readonly unknown[],
> = _BoundFunctionParametersRec<CallableParameters_<Func>, BoundArguments>

//

export type UnboundFunction<Func extends Callable> = BindableFunction<
	Func,
	UNSET,
	[]
>

export type BoundFunction<
	Func extends Callable,
	Options extends { this: unknown; argumentsPrefix?: readonly unknown[] },
> = BindableFunction<
	Func,
	Options['this'],
	Options['argumentsPrefix'] extends readonly unknown[]
		? Options['argumentsPrefix']
		: []
>
