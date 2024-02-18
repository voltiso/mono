// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, IsIdentical } from '@voltiso/util'

import type {
	$$Object,
	$$Record,
	$$Schema,
	$$Schemable,
	$$UnknownObject,
	$$UnknownRecord,
	CustomObject$,
	ImplicitInferSchema$_,
	Object$,
	Schema$,
	UnknownRecord$,
} from '~'

//

export type SchemarAnd<A extends $$Schema, B extends $$Schema> = SchemarAnd_<
	A,
	B
>

export type SchemarAnd_<A, B> = SchemarAnd.Step1<A, B>

//

export declare namespace SchemarAnd {
	/** Unknown record result? */
	export type Step1<A, B> = A extends $$UnknownRecord
		? B extends $$UnknownRecord
			? UnknownRecord$ // no type-params
			: Step2<A, B>
		: Step2<A, B>

	/** Object result? */
	export type Step2<A, B> = A extends
		| $$Object
		| $$Record
		| $$UnknownObject
		| $$UnknownRecord
		? B extends $$Object | $$Record | $$UnknownObject | $$UnknownRecord
			? GetObject<A, B>
			: GetUnknown<A, B>
		: GetUnknown<A, B>

	export type GetObject<
		A extends $$Object | $$Record | $$UnknownObject | $$UnknownRecord,
		B extends $$Object | $$Record | $$UnknownObject | $$UnknownRecord,
	> = A extends $$UnknownRecord // skip wildcard index signatures of unknown record
		? GetObject<$$Object & { Output: unknown; Input: unknown }, B>
		: B extends $$UnknownRecord
			? GetObject<A, $$Object & { Output: unknown; Input: unknown }>
			: A extends {
						Output: unknown
						Input: unknown
				  }
				? B extends {
						Output: unknown
						Input: unknown
					}
					? Object.Get<_<A['Output'] & B['Output']>, _<A['Input'] & B['Input']>>
					: never
				: never

	//

	export namespace Object {
		export type Get<Output, Input> =
			IsIdentical<Output, Input> extends true
				? Object$<Output>
				: CustomObject$<{ Output: Output; Input: Input }>
	}

	export type GetUnknown<A, B> = A extends {
		Output: unknown
		Input: unknown
	}
		? B extends { Output: unknown; Input: unknown }
			? Schema$ & {
					Output: A['Output'] & B['Output']
					Input: A['Input'] & B['Input']
				}
			: never
		: never
}

//

export type SchemarAndN<Ts extends readonly $$Schemable[]> =
	SchemarAndN.Impl<Ts>

export declare namespace SchemarAndN {
	export type Impl<Ts extends readonly unknown[]> = Ts extends [
		infer A,
		infer B,
		...infer Rest,
	]
		? SchemarAndN.Impl<
				[
					SchemarAnd_<ImplicitInferSchema$_<A>, ImplicitInferSchema$_<B>>,
					...Rest,
				]
			>
		: Ts extends [infer A]
			? ImplicitInferSchema$_<A>
			: never
}
