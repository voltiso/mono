// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, Input_, Output_, Schemable } from '@voltiso/schemar'
import type {
	DEFAULT_OPTIONS,
	IsCompatible,
	OPTIONS,
	Override,
	PARTIAL_OPTIONS,
} from '@voltiso/util'

import type {
	GetNestedSubject,
	NestedSubjectOptions,
	NestedSubjectTypeOptions,
} from '~'
import { _CustomNestedSubject } from '~'

//

/**
 * Convert runtime options type to generic argument type (hide some, expose
 * some)
 */
export type NestedSubjectTypeOptionsFromOptions<
	O extends Partial<NestedSubjectOptions>,
> = O extends { schema: Schemable }
	? {
			Output: Output_<O['schema']>
			Input: Input_<O['schema']>
	  }
	: O extends { initialValue: infer T }
	? {
			Output: T
			Input: T
	  }
	: {}

export interface NestedSubjectConstructor<
	TO extends Partial<NestedSubjectTypeOptions>,
> {
	readonly [PARTIAL_OPTIONS]: TO
	readonly [OPTIONS]: Override<this[DEFAULT_OPTIONS], TO>

	readonly [DEFAULT_OPTIONS]: NestedSubjectTypeOptions.Default

	// ! disable no-argument constructor?
	// new <
	// 	Type extends this[OPTIONS]['Output'] | NoArgument = NoArgument,
	// >(): undefined extends this[OPTIONS]['Input']
	// 	? GetNestedSubject<
	// 			[Type] extends [NoArgument]
	// 				? this[OPTIONS]
	// 				: Override<this[OPTIONS], { Output: Type; Input: Type }>
	// 	  >
	// 	: Throw<'Need to provide initialValue argument'>

	new <InitialValue extends this[OPTIONS]['Input']>(
		initialValue: InitialValue,
	): GetNestedSubject<
		IsCompatible<InitialValue, this[OPTIONS]['Input']> extends true // ! ?
			? this[OPTIONS]
			: Override<this[OPTIONS], { Output: InitialValue; Input: InitialValue }>
	>
}

export class NestedSubjectConstructor<
	TO extends Partial<NestedSubjectTypeOptions>,
> {
	readonly optionsOverride: Partial<NestedSubjectOptions> = {} as never

	constructor(optionsOverride: Partial<NestedSubjectOptions>) {
		this.optionsOverride = optionsOverride

		function NestedSubject(...args: [] | [unknown]) {
			const options =
				args.length === 0
					? optionsOverride
					: { ...optionsOverride, initialValue: args[0] }

			return Reflect.construct(
				_CustomNestedSubject,
				[options],
				// new.target,
			) as never
		}

		Object.setPrototypeOf(NestedSubject, this)

		// eslint-disable-next-line no-constructor-return
		return NestedSubject as never
	}

	//

	private with<O extends Partial<NestedSubjectOptions>>(
		optionsOverride: O,
	): NestedSubjectConstructor<
		Override<TO, NestedSubjectTypeOptionsFromOptions<O>>
	> {
		return new NestedSubjectConstructor({
			...this.optionsOverride,
			...optionsOverride,
		}) as never
	}

	schema<S extends $$Schemable>(schema: S) {
		return this.with({ schema })
	}
}

//

//

// const MyDerived = NestedSubject.with({ schema: { a: s.string } })
// const a = new MyDerived()

// const MyDerived2 = NestedSubject.schema({ a: s.string })
// const b = new MyDerived2()
