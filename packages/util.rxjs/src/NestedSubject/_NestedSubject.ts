// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { NestedSubjectTypeOptions } from '~'
import { _CustomNestedSubject } from '~'

export class _NestedSubject<
	TO extends NestedSubjectTypeOptions,
> extends lazyConstructor(() => _CustomNestedSubject)<TO> {
	constructor(initialValue: TO['Input']) {
		super({ initialValue })
	}
}
