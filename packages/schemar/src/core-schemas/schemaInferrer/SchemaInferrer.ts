// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, lazyValue } from '@voltiso/util'

import type { InferSchema$_ } from '~/types/InferSchema/InferSchema'
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
export interface ImplicitInfer {
	<S extends $$Schemable>(schemable: S): InferSchema$_<S>
}

// Non-generic version for faster type-check
export interface ImplicitInfer_ {
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

export type ImplicitSchemaInferrer$Constructor =
	new () => ImplicitSchemaInferrer$

export interface ImplicitSchemaInferrer$
	extends CustomSchemaInferrer$<{}>,
		ImplicitInfer {}

/** Non-generic version for faster type-check */
export interface ImplicitSchemaInferrer$_
	extends CustomSchemaInferrer$<{}>,
		ImplicitInfer_ {}

//

export const ImplicitSchemaInferrer$ = lazyConstructor(
	() => SchemaInferrerImpl,
) as unknown as ImplicitSchemaInferrer$Constructor

/** Implicit schema infer (will auto-default object shapes if possible) */
export const schema = lazyValue(() => new ImplicitSchemaInferrer$())

/** Non-generic version for faster type-check */
export const schema_ = lazyValue(
	() => new ImplicitSchemaInferrer$() as ImplicitSchemaInferrer$_,
)
