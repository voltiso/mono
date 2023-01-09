// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import type { Subject } from 'rxjs'

import type { INestedSubjectBase } from '~'

export type NestedSubjectReservedField = _<
	keyof INestedSubjectBase | keyof Subject<any>
>
