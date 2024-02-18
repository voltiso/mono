// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, Input_, Output_, Schemable } from '@voltiso/schemar'
import type {
	DEFAULT_OPTIONS,
	IsCompatible,
	OPTIONS,
	Override,
	PARTIAL_OPTIONS,
} from '@voltiso/util'

import { _CustomSubjectTree } from './_CustomSubjectTree'
import type { SubjectTreeTypeOptions } from './options/type-options'
import type { GetSubjectTree, RequiredSubjectTree } from './SubjectTree'
import type { SubjectTreeOptions } from './SubjectTreeOptions'

//

/**
 * Convert runtime options type to generic argument type (hide some, expose
 * some)
 */
export type SubjectTreeTypeOptionsFromOptions<
	O extends Partial<SubjectTreeOptions>,
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

export interface SubjectTreeConstructor<
	TO extends Partial<SubjectTreeTypeOptions>,
> {
	readonly [PARTIAL_OPTIONS]: TO
	readonly [OPTIONS]: Override<this[DEFAULT_OPTIONS], TO>

	readonly [DEFAULT_OPTIONS]: SubjectTreeTypeOptions.Default

	// ! disable no-argument constructor?
	// new <
	// 	Type extends this[OPTIONS]['Output'] | NoArgument = NoArgument,
	// >(): undefined extends this[OPTIONS]['Input']
	// 	? GetSubjectTree<
	// 			[Type] extends [NoArgument]
	// 				? this[OPTIONS]
	// 				: Override<this[OPTIONS], { Output: Type; Input: Type }>
	// 	  >
	// 	: Throw<'Need to provide initialValue argument'>

	new <InitialValue extends this[OPTIONS]['Input']>(
		initialValue: InitialValue,
	): unknown extends this[OPTIONS]['Input'] // TODO: hacky...
		? RequiredSubjectTree<InitialValue>
		: GetSubjectTree<
				IsCompatible<InitialValue, this[OPTIONS]['Input']> extends true // ! ?
					? this[OPTIONS]
					: Override<
							this[OPTIONS],
							{ Output: InitialValue; Input: InitialValue }
						>
			>

	// RequiredSubjectTree<InitialValue>

	// GetSubjectTree<
	// 	Override<this[OPTIONS], { Output: InitialValue; Input: InitialValue }>
	// >
}

// function test<T>(initialValue: T): RequiredSubjectTree<T> {
// 	const a = new SubjectTree(initialValue)
// 	return a
// }

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class SubjectTreeConstructor<
	TO extends Partial<SubjectTreeTypeOptions>,
> {
	readonly optionsOverride: Partial<SubjectTreeOptions> = {} as never

	constructor(optionsOverride: Partial<SubjectTreeOptions>) {
		this.optionsOverride = optionsOverride

		function SubjectTree(...args: [] | [unknown]) {
			const options =
				args.length === 0
					? optionsOverride
					: { ...optionsOverride, initialValue: args[0] }

			return Reflect.construct(
				_CustomSubjectTree,
				[options],
				// new.target,
			) as never
		}

		Object.setPrototypeOf(SubjectTree, this)

		// eslint-disable-next-line no-constructor-return
		return SubjectTree as never
	}

	//

	private with<O extends Partial<SubjectTreeOptions>>(
		optionsOverride: O,
	): SubjectTreeConstructor<
		Override<TO, SubjectTreeTypeOptionsFromOptions<O>>
	> {
		return new SubjectTreeConstructor({
			...this.optionsOverride,
			...optionsOverride,
		}) as never
	}

	withSchema<S extends $$Schemable>(schema: S) {
		return this.with({ schema })
	}
}

//

//

// const MyDerived = SubjectTree.with({ schema: { a: s.string } })
// const a = new MyDerived()

// const MyDerived2 = SubjectTree.schema({ a: s.string })
// const b = new MyDerived2()
