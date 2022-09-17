// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/patcher'
import type {
	GetDeepShape_,
	GetShape_,
	InferSchema_,
	InputType_,
	ISchema,
	OutputType_,
	SchemableLike,
	Type_,
} from '@voltiso/schemar.types'
import type { IBehaviorSubject } from '@voltiso/util.rxjs'
import type { BehaviorSubject } from 'rxjs'

import type { NestedSubject } from './NestedSubject'
import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'

export type INestedSubjectWithSchemaBase = {
	get schemable(): SchemableLike
	get schema(): ISchema
	get shape(): unknown
	get deepShape(): unknown

	set(x: unknown): void
	setUnchecked(x: unknown): void

	patch(x: unknown): void
	patchUnchecked(x: unknown): void

	update(x: unknown): void
	updateUnchecked(x: unknown): void

	delete(): void

	get exists(): boolean
}

export interface NestedSubjectWithSchemaBase<S extends SchemableLike>
	extends INestedSubjectWithSchemaBase {
	get schemable(): S
	get schema(): InferSchema_<S>
	get shape(): GetShape_<S>
	get deepShape(): GetDeepShape_<S>

	set(x: InputType_<S>): void
	setUnchecked(x: OutputType_<S>): void

	patch(x: PatchFor<InputType_<S>>): void
	patchUnchecked(x: PatchFor<OutputType_<S>>): void

	update(x: PatchFor<InputType_<S>>): void
	updateUnchecked(x: PatchFor<OutputType_<S>>): void

	delete(): void
}

//

/** @internal */
export type _GetNested<S extends SchemableLike> = [GetShape_<S>] extends [never]
	? { [k in keyof Type_<S>]: NestedSubject<Type_<S>[k]> }
	: {
			[k in keyof GetShape_<S>]: NestedSubjectWithSchema<GetShape_<S>[k]>
	  }

//

export interface INestedSubjectWithSchema
	extends INestedSubjectWithSchemaBase,
		IBehaviorSubject {
	_: {}
}

export type NestedSubjectWithSchema<S extends SchemableLike> =
	NestedSubjectWithSchemaBase<S> &
		BehaviorSubject<Type_<S>> &
		// eslint-disable-next-line etc/no-internal
		Omit<_GetNested<S>, NestedSubjectReservedField> & {
			// eslint-disable-next-line etc/no-internal
			_: _GetNested<S>
		}
