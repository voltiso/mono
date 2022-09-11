// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/patcher'
import type {
	GetShape_,
	InferSchema_,
	InputType_,
	OutputType_,
	SchemableLike,
	Type_,
} from '@voltiso/schemar.types'
import type { BehaviorSubject } from 'rxjs'

import type { NestedSubjectReservedField } from './_/NestedSubjectReservedFields'

export type NestedSubjectWithSchemaBase<S extends SchemableLike> = {
	get schemable(): S
	get schema(): InferSchema_<S>

	set(x: InputType_<S>): void
	setUnchecked(x: OutputType_<S>): void

	patch(x: PatchFor<InputType_<S>>): void
	patchUnchecked(x: PatchFor<OutputType_<S>>): void

	update(x: PatchFor<InputType_<S>>): void
	updateUnchecked(x: PatchFor<OutputType_<S>>): void
}

export type NestedSubjectWithSchema<S extends SchemableLike> =
	NestedSubjectWithSchemaBase<S> &
		BehaviorSubject<Type_<S>> &
		Omit<
			{
				[k in keyof GetShape_<S>]: NestedSubjectWithSchema<GetShape_<S>[k]>
			},
			NestedSubjectReservedField
		> & {
			_: {
				[k in keyof GetShape_<S>]: NestedSubjectWithSchema<GetShape_<S>[k]>
			}
		}
