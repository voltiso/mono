// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import type { BehaviorSubject } from 'rxjs'

import type { NestedSubjectBase, NestedSubjectWithSchemaBase } from '~'

export type NestedSubjectReservedField = _<
	| keyof NestedSubjectBase<any>
	| keyof NestedSubjectWithSchemaBase<any>
	| keyof BehaviorSubject<any>
	| '_'
>
