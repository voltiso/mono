// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import type { Subject } from 'rxjs'

import type { ISubjectTreeBase } from '~'

export type SubjectTreeReservedField = _<
	keyof ISubjectTreeBase | keyof Subject<any>
>
