// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Schema,
	$$Schemable,
	GetDeepShape_,
	GetShape_,
	InferSchema_,
	Input,
	Output,
	Type_,
} from '@voltiso/schemar'
import type { PatchFor, PatchOptions } from '@voltiso/util'
import type { IBehaviorSubject } from '@voltiso/util.rxjs'
import type { BehaviorSubject } from 'rxjs'

import type { NestedSubject } from './NestedSubject'
import type { NestedSubjectReservedField } from './NestedSubjectReservedFields'

export type INestedSubjectWithSchemaBase = {
	get schemable(): $$Schemable
	get schema(): $$Schema
	get shape(): unknown
	get deepShape(): unknown

	set(x: unknown): void
	setUnchecked(x: unknown): void

	patch(x: unknown, options?: any): void
	patchUnchecked(x: unknown, options?: any): void

	// update(x: unknown): void
	// updateUnchecked(x: unknown): void

	delete(): void

	get exists(): boolean
}

export interface NestedSubjectWithSchemaBase<S extends $$Schemable>
	extends INestedSubjectWithSchemaBase {
	get schemable(): S
	get schema(): InferSchema_<S>
	get shape(): GetShape_<S>
	get deepShape(): GetDeepShape_<S>

	set(x: Input<S>): void
	setUnchecked(x: Output<S>): void

	patch(x: PatchFor<Input<S>>, options?: PatchOptions): void
	patchUnchecked(x: PatchFor<Output<S>>, options?: PatchOptions): void

	// update(x: PatchFor<Input<S>>): void
	// updateUnchecked(x: PatchFor<Output<S>>): void

	delete(): void
}

//

/** @internal */
export type _GetNested<S extends $$Schemable> = GetShape_<S> extends never
	? { [k in keyof Type_<S>]: NestedSubject<Type_<S>[k]> }
	: {
			[k in keyof GetShape_<S>]: NestedSubjectWithSchema<
				GetShape_<S>[k] extends $$Schemable ? GetShape_<S>[k] : never
			>
	  }

//

export interface INestedSubjectWithSchema
	extends INestedSubjectWithSchemaBase,
		IBehaviorSubject {
	_: {}
}

export type NestedSubjectWithSchema<S extends $$Schemable> =
	NestedSubjectWithSchemaBase<S> &
		BehaviorSubject<Type_<S>> &
		// eslint-disable-next-line etc/no-internal
		Omit<_GetNested<S>, NestedSubjectReservedField> & {
			// eslint-disable-next-line etc/no-internal
			_: _GetNested<S>
		}
