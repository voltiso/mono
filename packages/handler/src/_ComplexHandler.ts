// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { ValidationError } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type {
	CustomFunction,
	DefineSchema,
	DefineSchema_,
	ISchema,
	SchemaLike,
} from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import type {
	Assume,
	GetProperty_,
	IntersectionFromUnion,
	MaybePromise,
	OPTIONS,
	Override,
	Return_,
} from '@voltiso/util'
import {
	$AssumeType,
	assert,
	BoundCallable,
	CALL,
	isPromiseLike,
} from '@voltiso/util'

import { isThisArgObject, THIS_ARG } from './_ThisArgObject.ts_'

//

type CanReturnPromiseLike<X> = true extends IsPromiseLike<Return_<X>>
	? true
	: false

type IsPromiseLike<X> = X extends PromiseLike<any> ? true : false

//

export namespace ComplexHandlerDetail {
	export type HiddenOptions<O extends InputOptions = InputOptions> = {
		implementation?: Implementation<O> | undefined
		name?: string | undefined
	}

	export type InputOptions = { IsAsync?: boolean | undefined } & (
		| Partial<t.FunctionOptions>
		| Options.SingleOverload
		| Options.MultipleOverloads
	)

	export namespace Options {
		export type SingleOverload = t.$$Function

		export type MultipleOverloads = {
			overloads: t.$$Function[]
		}
	}

	export type GetSignatures<O extends InputOptions> =
		O extends Options.SingleOverload
			? [O]
			: O extends Options.MultipleOverloads
			? O['overloads']
			: O extends Partial<t.FunctionOptions & { IsAsync?: boolean | undefined }>
			? [t.CustomFunction.FixInferredType<t.CustomFunction<O>>]
			: never

	export type GetIsAsync<O extends InputOptions> = O['IsAsync'] extends boolean
		? O['IsAsync']
		: false

	//

	export type Implementation<O extends InputOptions> =
		Implementation.FromSignatures<GetSignatures<O>, GetIsAsync<O>>

	export namespace Implementation {
		export type FromSignatures<
			S extends t.$$Function[],
			IsAsync extends boolean,
		> = IntersectionFromUnion<Inner<S[number], IsAsync>>

		export type Inner<
			F extends t.$$Function,
			IsAsync extends boolean,
		> = IsAsync extends false
			? F extends {
					InputReturn: unknown
			  }
				? GetProperty_<
						CustomFunction.FixInferredType<
							DefineSchema<
								F,
								{
									return: SchemaLike<Awaited<F['InputReturn']>>
								}
							>
						>,
						'Output'
				  >
				: never
			: // F extends { Inner: unknown }
			// 	? F['Inner']
			// 	: never
			IsAsync extends true
			? F extends {
					InputReturn: unknown
			  }
				? GetProperty_<
						CustomFunction.FixInferredType<
							DefineSchema<
								F,
								{
									return: SchemaLike<MaybePromise<F['InputReturn']>>
								}
							>
						>,
						'Output'
				  >
				: never
			: never
	}

	//

	export type Type<O extends InputOptions> = Type.FromSignatures<
		GetSignatures<O>,
		GetIsAsync<O>
	>

	export namespace Type {
		export type FromSignatures<
			S extends t.$$Function[],
			IsAsync extends boolean,
		> = IntersectionFromUnion<Outer<S[number], IsAsync>>

		export type Outer<
			F extends t.$$Function,
			IsAsync extends boolean,
		> = IsAsync extends true
			? F extends { OutputReturn: unknown }
				? GetProperty_<
						DefineSchema<
							F,
							{
								return: SchemaLike<MaybePromise<F['OutputReturn']>>
							}
						>,
						'Outer'
				  >
				: never
			: IsAsync extends false
			? F extends { Outer: unknown }
				? F['Outer']
				: never
			: never
	}

	export type WithParameter<
		This,
		Options extends InputOptions,
		Parameter,
	> = This extends { signature: { getParametersSchema: { getShape: unknown } } }
		? GetSignatures<Options> extends [infer SingleOverload]
			? ComplexHandler_<{
					overloads: [
						CustomFunction.FixInferredType<
							DefineSchema_<
								SingleOverload,
								{
									parameters: [
										...Assume<
											readonly unknown[],
											This['signature']['getParametersSchema']['getShape']
										>,
										Parameter,
									]
								}
							>
						>,
					]
					IsAsync: Options['IsAsync']
			  }>
			: never
		: never
}

//

function isMultipleOverloads(
	options: ComplexHandlerDetail.InputOptions,
): options is ComplexHandlerDetail.Options.MultipleOverloads {
	return !!(options as ComplexHandlerDetail.Options.MultipleOverloads | null)
		?.overloads
}

function getSignatures<Options extends ComplexHandlerDetail.InputOptions>(
	options: Options,
): ComplexHandlerDetail.GetSignatures<Options> {
	const rawSignatures: (t.IFunction | Partial<t.FunctionOptions>)[] =
		isMultipleOverloads(options)
			? (options.overloads as never)
			: ([options] as never)

	return rawSignatures.map(rawSignature =>
		t.isFunction(rawSignature)
			? rawSignature
			: s.function(rawSignature as never),
	) as never
}

//

export interface HandlerConstructor {
	new (): ComplexHandler<{}>

	new <Options extends ComplexHandlerDetail.Options.SingleOverload>(
		options: Options & ComplexHandlerDetail.HiddenOptions<Options>,
	): ComplexHandler<Options>

	new <Options extends ComplexHandlerDetail.Options.MultipleOverloads>(
		options: Options & ComplexHandlerDetail.HiddenOptions<Options>,
	): ComplexHandler<Options>

	new <Options extends ComplexHandlerDetail.InputOptions>(
		options: Options & ComplexHandlerDetail.HiddenOptions<Options>,
	): ComplexHandler<Options>
}

export interface CustomComplexHandler<
	Options extends ComplexHandlerDetail.InputOptions,
> {
	readonly [OPTIONS]: Options
	readonly IsAsync: Options['IsAsync'] extends boolean
		? Options['IsAsync']
		: false
}

// @staticImplements<HandlerConstructor>()
export class CustomComplexHandler<
	Options extends ComplexHandlerDetail.InputOptions,
> {
	readonly signatures: Readonly<ComplexHandlerDetail.GetSignatures<Options>>

	_name: string | undefined

	get getName(): string | undefined {
		return this._name
	}

	get signature(): this['signatures'] extends readonly [infer SingleOverload]
		? SingleOverload
		: never {
		assert(
			this.signatures.length === 1,
			'Handler has multiple signatures - use `.signatures()` instead.',
		)

		const signature = this.signatures[
			0 as never
		] as ComplexHandlerDetail.Options.SingleOverload

		return signature as never
	}

	readonly implementation:
		| IntersectionFromUnion<
				ComplexHandlerDetail.Implementation<
					ComplexHandlerDetail.GetSignatures<Options>[number]
				>
		  >
		| undefined

	constructor(
		inputOptions?: (Options & ComplexHandlerDetail.HiddenOptions) | undefined,
	) {
		const options: Options & ComplexHandlerDetail.HiddenOptions =
			inputOptions ?? ({} as never)

		this._name = options.name
		this.signatures = getSignatures(options) as never
		this.implementation = options.implementation as never
		// eslint-disable-next-line no-constructor-return
		return BoundCallable(this as unknown as ComplexHandler<Options>) as never
	}

	name(newName: string): this {
		return new ComplexHandler<Options>({
			name: newName,
			signatures: this.signatures as never,
		} as never) as never
	}

	// /** Works for single overloads only */
	// parameter<ParameterSchema extends $$Schemable>(
	// 	parameterSchema: ParameterSchema,
	// ): HandlerDetail.WithParameter<this, Options, ParameterSchema> {
	// 	const signature = this.signature
	// 	$AssumeType<t.IFunction>(signature)
	// 	const parameters = signature.getParametersSchema
	// 	assert(isTuple(parameters))
	// 	return new Handler({
	// 		name: this.getName,

	// 		signatures: [
	// 			{
	// 				// eslint-disable-next-line security/detect-object-injection
	// 				...signature[PARTIAL_OPTIONS],
	// 				parameters: [...parameters.getShape, parameterSchema],
	// 			},
	// 		],
	// 	}) as never
	// }

	// /** Works for single overloads only */
	// return<ReturnSchema extends $$Schemable>(
	// 	returnSchema: ReturnSchema,
	// ): HandlerDetail.GetSignatures<Options> extends readonly [
	// 	infer SingleOverload,
	// ]
	// 	? Handler_<{
	// 			overloads: [
	// 				CustomFunction.FixInferredType<
	// 					DefineSchema_<SingleOverload, { return: ReturnSchema }>
	// 				>,
	// 			]
	// 			IsAsync: Options['IsAsync'] extends true ? true : false
	// 	  }>
	// 	: never {
	// 	const signature = this.signature
	// 	$AssumeType<t.IFunction>(signature)
	// 	return new Handler({
	// 		name: this.getName,

	// 		signatures: [
	// 			{
	// 				// eslint-disable-next-line security/detect-object-injection
	// 				...signature[PARTIAL_OPTIONS],
	// 				return: returnSchema,
	// 			},
	// 		],
	// 	}) as never
	// }

	overload<
		NewOptions extends
			| Partial<t.FunctionOptions>
			| ComplexHandlerDetail.Options.SingleOverload,
	>(
		options: NewOptions,
	): ComplexHandler<{
		overloads: [
			...ComplexHandlerDetail.GetSignatures<Options>,
			...ComplexHandlerDetail.GetSignatures<NewOptions>,
		]
	}> {
		const overloads = [...this.signatures, ...getSignatures(options)]
		return new ComplexHandler({ overloads }) as never
	}

	//

	//

	implement<
		Implementation extends ComplexHandlerDetail.Implementation<Options>,
	>(
		implementation: Implementation,
	): ComplexHandlerDetail.GetIsAsync<Options> extends true
		? this
		: CanReturnPromiseLike<Implementation> extends true
		? ComplexHandler<Override<Options, { IsAsync: true }>>
		: this

	implement(
		implementation: ComplexHandlerDetail.Implementation<
			Override<Options, { IsAsync: true }>
		>,
	): ComplexHandler<Override<Options, { IsAsync: true }>>

	//

	implement(implementation: unknown): unknown {
		return new ComplexHandler({
			overloads: this.signatures as never,
			implementation: implementation as never,
		}) as never
	}

	//

	[CALL](...inputArgs: unknown[]): never {
		const [thisArg, ...args] = isThisArgObject(inputArgs[0])
			? // eslint-disable-next-line security/detect-object-injection
			  [inputArgs[0][THIS_ARG], ...inputArgs.slice(1)]
			: [global, ...inputArgs]

		if (!this.implementation) {
			throw new Error('[@voltiso/handler] Handler has no implementation.')
		}

		let valid:
			| {
					signature: t.IFunction
					this: unknown
					parameters: unknown[]
			  }
			| undefined

		for (const signature of this.signatures) {
			$AssumeType<t.IFunction>(signature)
			try {
				const validThis = signature.hasThis
					? (signature.getThisSchema as ISchema).validate(thisArg)
					: this

				const validArgs = (signature.getParametersSchema as ISchema).validate(
					args,
				) as unknown[]

				valid = {
					signature,
					this: validThis,
					parameters: validArgs,
				}

				break
			} catch (error: unknown) {
				if (!(error instanceof ValidationError)) throw error

				if (this.signatures.length === 1) {
					throw error
				}
			}
		}

		if (!valid) {
			throw new Error('[@voltiso/handler] No valid signature found')
		}

		const rawReturnOrPromise = Function.prototype.call.call(
			this.implementation as never,
			valid.this,
			...valid.parameters,
		) as unknown

		function finalize(rawReturn: unknown) {
			assert(valid)
			const validReturn = (valid.signature.getReturnSchema as ISchema).validate(
				rawReturn,
			)
			return validReturn
		}

		if (isPromiseLike(rawReturnOrPromise))
			// eslint-disable-next-line promise/prefer-await-to-then
			return rawReturnOrPromise.then(finalize) as never
		else return finalize(rawReturnOrPromise) as never
	}

	// TODO: `BoundCallable` should have this functionality embedded maybe? And detect if called via Function.prototype.call or Function.prototype.apply?

	call(thisArg: unknown, ...args: unknown[]): unknown {
		// eslint-disable-next-line security/detect-object-injection
		return this[CALL]({ [THIS_ARG]: thisArg }, ...args)
	}

	bind(thisArg: unknown, ...args: unknown[]): unknown {
		// eslint-disable-next-line consistent-this, @typescript-eslint/no-this-alias, unicorn/no-this-assignment
		const self = this
		return Function.prototype.bind.call(
			function (this: unknown, ...moreArgs: unknown[]) {
				// eslint-disable-next-line security/detect-object-injection
				return self[CALL]({ [THIS_ARG]: this }, ...moreArgs)
			},
			thisArg,
			...args,
		)
	}

	apply(thisArg: unknown, args: unknown[]): unknown {
		// eslint-disable-next-line security/detect-object-injection
		return this[CALL]({ [THIS_ARG]: thisArg }, ...args)
	}
}

//

export type ComplexHandler_<Options> =
	Options extends ComplexHandlerDetail.InputOptions
		? ComplexHandler<Options>
		: never

export type ComplexHandler<Options extends ComplexHandlerDetail.InputOptions> =
	CustomComplexHandler<Options> & ComplexHandlerDetail.Type<Options>

export const ComplexHandler =
	CustomComplexHandler as unknown as HandlerConstructor
