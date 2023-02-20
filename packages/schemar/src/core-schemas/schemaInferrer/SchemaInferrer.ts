// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyFunction } from '@voltiso/util'

import type { ImplicitInferSchema$_ } from '~/types/InferSchema/InferSchema'
import type { ISchema$ } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { CustomSchemaInferrer$ } from './CustomSchemaInferrer'
import { SchemaInferrerImpl } from './SchemaInferrerImpl'

/**
 * All library functions will behave same way with inferables and schemas
 * implicitly inferred from these inferables
 *
 * On the other hand, the explicit `s.infer` function will never auto-default
 * objects - it will behave as `s.object` if object inferable is provided
 */
export interface ImplicitInferSchema$Function {
	<S extends $$Schemable>(schemable: S): ImplicitInferSchema$_<S>
}

// Non-generic version for faster type-check
export interface ImplicitInferSchema$Function_ {
	(schemable: $$Schemable): ISchema$
}

// export declare namespace ImplicitInfer {
// export type HandleInferableObjects<S> = S extends $$InferableObject ? object extends Input_<S> ?  : InferSchema$.Simple<S> : never

// export type MakeImplicit<I, S> = S extends $$Object & {
// 	readonly Input: object | undefined
// }
// 	? object extends S['Input']
// 		? $DefineCustomObject<
// 				ObjectOptions.Simplify<
// 					$Override_<
// 						S[OPTIONS],
// 						{
// 							hasDefault: true
// 							Input: S['Input'] | undefined
// 						}
// 					>
// 				>
// 		  >
// 		: S
// 	: S

// export type $DefineCustomObject<O extends Partial<ObjectOptions>> =
// 	O extends any ? CustomObject$<O> : never
// }

export type ImplicitSchema$InferrerConstructor =
	new () => ImplicitSchemaInferrer$

export interface ImplicitSchemaInferrer$
	extends CustomSchemaInferrer$<{}>,
		ImplicitInferSchema$Function {}

/** Non-generic version for faster type-check */
export interface ImplicitSchemaInferrer$_
	extends CustomSchemaInferrer$<{}>,
		ImplicitInferSchema$Function_ {}

//

export const ImplicitSchemaInferrer$ = lazyConstructor(
	() => SchemaInferrerImpl,
) as unknown as ImplicitSchema$InferrerConstructor

/** Implicit schema infer (will auto-default object shapes if possible) */
export const schema = lazyFunction(() => new ImplicitSchemaInferrer$())

/** Non-generic version for faster type-check */
export const schema_ = lazyFunction(
	() => new ImplicitSchemaInferrer$() as ImplicitSchemaInferrer$_,
)
