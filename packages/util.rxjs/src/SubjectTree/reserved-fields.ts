// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import type { Subject } from 'rxjs'

import type { IRequiredSubjectTreeBase } from '~'

export type SubjectTreeReservedField = _<
	keyof IRequiredSubjectTreeBase | keyof Subject<any>
>
