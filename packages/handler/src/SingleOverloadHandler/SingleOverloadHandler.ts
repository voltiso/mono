// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import type { Assume, NoThis, OPTIONS, Override, Rebind } from '@voltiso/util'
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
		this: t.$$Schemable | NoThis
		parameters: t.$$Schemable[]
		return: t.$$Schemable
	}

	export namespace Options {
		export interface Default
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			extends Handler.Options.Default,
				Omit<Options, keyof Handler.Options.Default> {
			//
			this: NoThis
			parameters: []
			return: t.Void
		}

		export interface Hidden<O extends Options>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			extends Handler.Options.Hidden<O> {
			implementation?: Inner<O> | undefined
		}
	}

	//

	export type Outer<O extends SingleOverloadHandlerDetail.Options> = [
		O['this'],
	] extends [NoThis]
		? (
				...args: Assume<readonly unknown[], t.Input<O['parameters']>>
		  ) => t.Output<O['return']>
		: (
				this: t.Input<O['this']>,
				...args: Assume<readonly unknown[], t.Input<O['parameters']>>
		  ) => t.Output<O['return']>

	//

	export type Inner<O extends SingleOverloadHandlerDetail.Options> = [
		O['this'],
	] extends [NoThis]
		? (
				...args: Assume<readonly unknown[], t.Output<O['parameters']>>
		  ) => t.Input<O['return']>
		: (
				this: t.Output<O['this']>,
				...args: Assume<readonly unknown[], t.Output<O['parameters']>>
		  ) => t.Input<O['return']>

	//

	export type RebindAndUpdateSignature<
		This extends SingleOverloadHandlerImpl<any>,
		PartialOptions extends Partial<Options>,
	> = Rebind<
		This,
		Override<
			PartialOptions,
			{
				Signature: Outer<Override<This[OPTIONS], PartialOptions>>
			}
		>
	>

	export type WithThis<
		This extends SingleOverloadHandlerImpl<any>,
		NewThis extends t.$$Schemable,
	> = RebindAndUpdateSignature<
		This,
		{
			this: NewThis
		}
	>

	export type WithParameter<
		This extends SingleOverloadHandlerImpl<any>,
		Parameter extends t.$$Schemable,
	> = RebindAndUpdateSignature<
		This,
		{
			parameters: [...This[OPTIONS]['parameters'], Parameter]
		}
	>

	export type WithReturn<
		This extends SingleOverloadHandlerImpl<any>,
		Return extends t.$$Schemable,
	> = RebindAndUpdateSignature<
		This,
		{
			return: Return
		}
	>
}

export const defaultSingleOverloadHandlerOptions: SingleOverloadHandlerDetail.Options.Default =
	{
		...defaultHandlerOptions,
		this: noThis,
		parameters: [],
		return: s.void,
	}

//

export const singleOverloadHandlerGenericId = Symbol('SingleOverloadHandler')

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
	//
	declare readonly [GENERIC_ID]: typeof singleOverloadHandlerGenericId;

	declare readonly [BASE_OPTIONS]: SingleOverloadHandlerDetail.Options;
	declare readonly [DEFAULT_OPTIONS]: SingleOverloadHandlerDetail.Options.Default;

	declare readonly [HIDDEN_OPTIONS]: SingleOverloadHandlerDetail.Options.Hidden<
		Override<this[BASE_OPTIONS], O>
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
		if (!this.implementation) {
			throw new Error('Checked: no implementation provided')
		}

		const thisSchema =
			this.options.this === noThis ? s.void : (this.options.this as t.ISchema)

		const validThis = thisSchema.validate(thisArg)

		const parametersSchema = s.infer(
			this.options.parameters,
		) as unknown as t.ISchema
		const validParameters = parametersSchema.validate(args) as unknown[]

		// eslint-disable-next-line @typescript-eslint/ban-types
		const result = (this.implementation as Function).call(
			validThis as never,
			...validParameters,
		) as unknown

		const returnSchema = this.options.return as t.ISchema

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

	this<ThisSchema extends t.$$Schemable>(
		thisSchema: ThisSchema,
	): SingleOverloadHandlerDetail.WithThis<this, ThisSchema> {
		return this.rebind({
			this: thisSchema,
		}) as never
	}

	parameter<ParameterSchema extends t.$$Schemable>(
		parameterSchema: ParameterSchema,
	): SingleOverloadHandlerDetail.WithParameter<this, ParameterSchema> {
		return this.rebind({
			parameters: [...this.options.parameters, parameterSchema],
		}) as never
	}

	return<ReturnSchema extends t.$$Schemable>(
		returnSchema: ReturnSchema,
	): SingleOverloadHandlerDetail.WithReturn<this, ReturnSchema> {
		return this.rebind({
			return: returnSchema,
		}) as never
	}
}

//

export type SingleOverloadHandler<
	O extends Partial<SingleOverloadHandlerDetail.Options>,
> = SingleOverloadHandlerImpl<O> &
	SingleOverloadHandlerDetail.Outer<SingleOverloadHandlerImpl<O>[OPTIONS]>

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
