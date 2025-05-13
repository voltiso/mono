// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	AlsoAccept,
	GENERIC_ID,
	MaybePromise,
	OPTIONS,
	Override,
	PARTIAL_OPTIONS,
} from '@voltiso/util'
import {
	BASE_OPTIONS,
	BoundCallable,
	CALL,
	DEFAULT_OPTIONS,
	define,
	HIDDEN_OPTIONS,
	noThis,
	PolymorphicGeneric,
} from '@voltiso/util'

import type { HandlerDerived } from './HandlerDerived-augmentation'

export namespace Handler {
	export interface Options {
		/** Type-only */
		Signature: (...args: any) => any

		/** Type-only */
		Implementation: (...args: any) => any
	}

	export namespace Options {
		export interface Default extends Options {
			Signature: () => MaybePromise<void>
			Implementation: () => MaybePromise<void>
		}

		/** Value-only */
		export interface Hidden<O extends Options> {
			name?: string | undefined
			implementation?: O['Implementation'] | undefined
		}
	}

	//

	/** Get derived Handler type by TypeID, with given partial Options */
	export type Bind<
		GenericId extends string | symbol,
		O extends Partial<Options>,
	> = HandlerDerived<O>[GenericId & keyof HandlerDerived<O>]

	/**
	 * Get derived Handler of the same type, after merging with additional partial
	 * Options
	 */
	export type Rebind<
		This extends PolymorphicGeneric<O>,
		O extends Partial<This[BASE_OPTIONS]> | AlsoAccept<{}>,
	> = Bind<This[GENERIC_ID], Override<This[PARTIAL_OPTIONS], O>>
}

export const defaultHandlerOptions: Handler.Options.Default &
	Handler.Options.Hidden<Handler.Options.Default> = define<
	Handler.Options.Hidden<Handler.Options.Default>
>().value(
	Object.freeze({
		// eslint-disable-next-line sonarjs/no-undefined-assignment
		name: undefined,
	}),
) as never

//

//

export class HandlerImpl<O extends Partial<Handler.Options>>
	extends PolymorphicGeneric<O>
	implements Omit<IHandler, 'bind' | 'call' | 'apply'>
{
	declare readonly [BASE_OPTIONS]: Handler.Options
	declare readonly [DEFAULT_OPTIONS]: Handler.Options.Default
	declare readonly [HIDDEN_OPTIONS]: Handler.Options.Hidden<this[OPTIONS]>

	//

	/** 🌿 Type-only! (no value at runtime) */
	declare readonly Signature: this[OPTIONS]['Signature']

	/** 🌿 Type-only! (no value at runtime) */
	declare readonly Implementation: this[OPTIONS]['Implementation']

	//

	get getName(): string {
		return this.options.name ?? 'unknown'
	}

	get getImplementation(): this[OPTIONS]['Implementation'] | undefined {
		return this.options.implementation as never
	}

	constructor(partialOptions: O & HandlerImpl<O>[HIDDEN_OPTIONS]) {
		super({ ...defaultHandlerOptions, ...partialOptions } as never)
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this) as never
	}

	//

	name(name: string): this {
		return this.rebind({ name }) as never
	}

	implement(implementation: this[OPTIONS]['Implementation']): this {
		return this.rebind({ implementation }) as never
	}

	//

	[CALL](...args: unknown[]): never {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return this._call(noThis as never, ...(args as any)) as never
	}

	protected _call(thisArg: unknown, ...args: unknown[]): unknown {
		if (!this.getImplementation)
			throw new Error(`Handler '${this.getName}' has no implementation`)
		return Function.prototype.call.call(
			this.getImplementation,
			thisArg,
			...args,
		) as never
	}

	//

	// TODO: `BoundCallable` should have this functionality embedded maybe? And detect if called via Function.prototype.call or Function.prototype.apply?

	call(thisArg: unknown, ...args: unknown[]): unknown {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return this._call(thisArg as never, ...(args as any))
	}

	bind(thisArg: unknown, ...args: unknown[]): unknown {
		// eslint-disable-next-line unicorn/no-this-assignment, consistent-this, @typescript-eslint/no-this-alias
		const self = this
		return Function.prototype.bind.call(
			function (this: unknown, ...moreArgs: unknown[]) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				return self._call(this as never, ...(moreArgs as any))
			},
			thisArg,
			...args,
		)
	}

	apply(thisArg: unknown, args: unknown[]): unknown {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		return this._call(thisArg as never, ...(args as any))
	}
}

//

export interface IHandler {
	(...args: any): unknown

	/** Type-only */
	readonly Signature: (...args: any) => any

	/** Type-only */
	readonly Implementation: (...args: any) => any
}

export type Handler<O extends Partial<Handler.Options> = never> = [O] extends [
	never,
]
	? IHandler
	: HandlerImpl<O> & HandlerImpl<O>[OPTIONS]['Signature']
