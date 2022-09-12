// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetDeepShape_, GetShape_, InferSchema_, Type_ } from '@voltiso/schemar.types'
import type { Observable } from 'rxjs'

export type ReadonlySubjectWithSchema<S> = Observable<Type_<S>> & {
	value: Type_<S>

	get schemable(): S
	get schema(): InferSchema_<S>
	get shape(): GetShape_<S>
	get deepShape(): GetDeepShape_<S>
}
