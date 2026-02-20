// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Subject } from 'rxjs'

export type SubjectDeprecatedKey =
	| 'observers'
	| 'isStopped'
	| 'hasError'
	| 'thrownError'
	| 'lift'
	| 'operator'
	| 'source'
	| 'toPromise'

export interface SubjectNoDeprecated<T>
	extends Omit<Subject<T>, SubjectDeprecatedKey> {}
// Record<SubjectDeprecatedKey, never> {}
