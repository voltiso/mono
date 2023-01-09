// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	IBehaviorSubject,
	INestedSubjectBase,
	IOptionalNestedSubjectBase,
} from '~'

export interface INestedSubject extends INestedSubjectBase, IBehaviorSubject {
	_: object
}

export interface IOptionalNestedSubject
	extends IOptionalNestedSubjectBase,
		IBehaviorSubject {
	_: object
}
