// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { SubjectTreeTypeOptions } from '~'
import { _CustomSubjectTree } from '~'

export class _SubjectTree<
	TO extends SubjectTreeTypeOptions,
> extends lazyConstructor(() => _CustomSubjectTree)<TO> {
	constructor(initialValue: TO['Input']) {
		super({ initialValue })
	}
}
