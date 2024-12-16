// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RelaxSchema_ } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type {
	$Override_,
	Assume,
	MaybePromise,
	NoThis,
	OPTIONS,
	Override,
	Rebind,
} from '@voltiso/util'
import {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	GENERIC_ID,
	HIDDEN_OPTIONS,
	isPromiseLike,
	noThis,
} from '@voltiso/util'

import type { Handler } from '../Handler'
import { defaultHandlerOptions, HandlerImpl } from '../Handler'

export namespace SingleOverloadHandlerDetail {
	export interface Options extends Handler.Options {
		/**
		 * Should apply MaybePromise<T> to the return type?
		 *
		 * Type-only
		 */
		IsAsync: boolean

		/** Currently not type-exposed */
		this: s.$$Schemable | NoThis

		/** Currently not type-exposed */
		parameters: s.$$Schemable[]

		/** Currently not type-exposed */
		return: s.$$Schemable
	}

	export namespace Options {
		export interface Default
			extends Handler.Options.Default,
				Omit<Options, keyof Handler.Options.Default> {
			IsAsync: true

			this: NoThis
			parameters: []
			return: s.Void
		}

		export interface Hidden<O extends Options>
			extends Handler.Options.Hidden<O> {
			// implementation?: GetImplementation<O> | undefined
		}
	}

	//

	export type GetSignature<O extends Options> = [O['this']] extends [NoThis]
		? (
				...args: Assume<readonly unknown[], s.Input<O['parameters']>>
			) => O['IsAsync'] extends true
				? MaybePromise<s.Output<O['return']>>
				: O['IsAsync'] extends false
					? s.Output<O['return']>
					: never
		: (
				this: s.Input<O['this']>,
				...args: Assume<readonly unknown[], s.Input<O['parameters']>>
			) => O['IsAsync'] extends true
				? MaybePromise<s.Output<O['return']>>
				: O['IsAsync'] extends false
					? s.Output<O['return']>
					: never

	//

	export type GetImplementation<O extends Options> = [O['this']] extends [
		NoThis,
	]
		? (
				...args: Assume<readonly unknown[], s.Output<O['parameters']>>
			) => O['IsAsync'] extends true
				? MaybePromise<s.Input<O['return']>>
				: O['IsAsync'] extends false
					? s.Input<O['return']>
					: never
		: (
				this: s.Output<O['this']>,
				...args: Assume<readonly unknown[], s.Output<O['parameters']>>
			) => MaybePromise<s.Input<O['return']>>

	//

	export type RebindAndUpdateSignature<
		This extends SingleOverloadHandlerImpl<any>,
		PartialOptions extends Partial<Options>,
	> = Rebind<
		This,
		$Override_<
			PartialOptions,
			{
				Signature: GetSignature<Override<This[OPTIONS], PartialOptions>>

				Implementation: GetImplementation<
					$Override_<This[OPTIONS], PartialOptions>
				>
			}
		>
	>

	export type WithThis<
		This extends SingleOverloadHandlerImpl<any>,
		NewThis extends s.$$Schemable,
	> = RebindAndUpdateSignature<
		This,
		{
			this: RelaxSchema_<NewThis>
		}
	>

	export type WithParameter<
		This extends SingleOverloadHandlerImpl<any>,
		Parameter extends s.$$Schemable,
	> = RebindAndUpdateSignature<
		This,
		{
			parameters: [...This[OPTIONS]['parameters'], RelaxSchema_<Parameter>]
		}
	>

	// type A = void extends PromiseLike<any> ? true : false
	// type B = Promise<number> extends PromiseLike<any> ? true : false
	// type C = PromiseLike<number> extends PromiseLike<any> ? true : false
	// type D = object extends PromiseLike<any> ? true : false
	// type E = {} extends PromiseLike<any> ? true : false

	export type WithReturn<
		This extends SingleOverloadHandlerImpl<any>,
		Return extends s.$$Schemable,
	> = RebindAndUpdateSignature<
		This,
		{
			return: RelaxSchema_<Return>
			IsAsync: true
			// IsAsync: t.Output<Return> extends never
			// 	? false
			// 	: t.Output<Return> extends PromiseLike<any>
			// 	? true
			// 	: false
		}
	>

	export type WithReturnSync<
		This extends SingleOverloadHandlerImpl<any>,
		Return extends s.$$Schemable,
	> = RebindAndUpdateSignature<
		This,
		{
			return: RelaxSchema_<Return>
			IsAsync: false
		}
	>
}

export const defaultSingleOverloadHandlerOptions: SingleOverloadHandlerDetail.Options.Default =
	Object.freeze({
		...defaultHandlerOptions,

		this: noThis,
		parameters: [],
		return: s.void,
	}) as never

//

export type SingleOverloadHandlerGenericId = {
	readonly symbol: unique symbol
}['symbol']

export const singleOverloadHandlerGenericId: SingleOverloadHandlerGenericId =
	Symbol('SingleOverloadHandler') as never

//

declare module '@voltiso/util' {
	interface Generics<PartialOptions extends {}> {
		[singleOverloadHandlerGenericId]: SingleOverloadHandler<PartialOptions>
	}
}

//

/** A single-overload version of `Handler` */
// @staticImplements<CheckedConstructor>()
export class SingleOverloadHandlerImpl<
	O extends Partial<SingleOverloadHandlerDetail.Options>,
> extends HandlerImpl<O> {
	declare readonly [GENERIC_ID]: typeof singleOverloadHandlerGenericId

	declare readonly [BASE_OPTIONS]: SingleOverloadHandlerDetail.Options
	declare readonly [DEFAULT_OPTIONS]: SingleOverloadHandlerDetail.Options.Default

	declare readonly [HIDDEN_OPTIONS]: SingleOverloadHandlerDetail.Options.Hidden<
		this[OPTIONS]
	>

	constructor(
		partialOptions: O &
			SingleOverloadHandlerDetail.Options.Hidden<
				SingleOverloadHandlerImpl<O>[OPTIONS]
			>,
	) {
		super({
			...defaultSingleOverloadHandlerOptions,
			...partialOptions,
		})
	}

	//

	protected override _call(thisArg: unknown, ...args: unknown[]): unknown {
		if (!this.getImplementation) {
			throw new Error('Checked: no implementation provided')
		}

		const thisSchema: s.Schema =
			this.options.this === noThis
				? (s.void as never)
				: (s.schema(this.options.this) as never)

		const validThis = thisSchema.validate(thisArg)

		// ! s.infer ???
		const parametersSchema = s.schema(
			this.options.parameters,
		) as unknown as s.Schema
		const validParameters = parametersSchema.validate(args) as unknown[]

		// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
		const result = (this.getImplementation as Function).call(
			validThis as never,
			...validParameters,
		) as unknown

		const returnSchema: s.Schema = s.schema(this.options.return)

		function finalize(result: unknown) {
			const validResult = returnSchema.validate(result)
			return validResult
		}

		// eslint-disable-next-line promise/prefer-await-to-then
		if (isPromiseLike(result)) return result.then(finalize)
		else return finalize(result)
	}

	//

	get getThis(): this[OPTIONS]['this'] {
		return this.options.this as never
	}

	get getParameters(): this[OPTIONS]['parameters'] {
		return this.options.parameters as never
	}

	get getReturn(): this[OPTIONS]['return'] {
		return this.options.return as never
	}

	//

	this<ThisSchema extends s.$$Schemable>(
		thisSchema: ThisSchema,
	): SingleOverloadHandlerDetail.WithThis<this, ThisSchema> {
		return this.rebind({
			this: thisSchema,
		}) as never
	}

	parameter<ParameterSchema extends s.$$Schemable>(
		parameterSchema: ParameterSchema,
	): SingleOverloadHandlerDetail.WithParameter<this, ParameterSchema> {
		return this.rebind({
			parameters: [...this.options.parameters, parameterSchema],
		}) as never
	}

	return<ReturnSchema extends s.$$Schemable>(
		returnSchema: ReturnSchema,
	): SingleOverloadHandlerDetail.WithReturn<this, ReturnSchema> {
		return this.rebind({
			return: returnSchema,
		}) as never
	}

	// eslint-disable-next-line sonarjs/no-identical-functions
	returnSync<ReturnSchema extends s.$$Schemable>(
		returnSchema: ReturnSchema,
	): SingleOverloadHandlerDetail.WithReturnSync<this, ReturnSchema> {
		return this.rebind({
			return: returnSchema,
		}) as never
	}
}

//

export type SingleOverloadHandler<
	O extends Partial<SingleOverloadHandlerDetail.Options>,
> = SingleOverloadHandlerImpl<O> &
	SingleOverloadHandlerDetail.GetSignature<
		SingleOverloadHandlerImpl<O>[OPTIONS]
	>

export const SingleOverloadHandler =
	SingleOverloadHandlerImpl as unknown as SingleOverloadHandlerConstructor

//

export interface SingleOverloadHandlerConstructor {
	new <O extends Partial<SingleOverloadHandlerDetail.Options>>(
		inputOptions: O,
		// & SingleOverloadHandlerDetail.Options.Hidden<O>,
	): SingleOverloadHandler<O>
}

//

export const checked = new SingleOverloadHandler({})
