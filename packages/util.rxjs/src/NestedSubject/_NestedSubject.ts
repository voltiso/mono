// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubjectTypeOptions } from '~'
import { _CustomNestedSubject } from '~'

export class _NestedSubject<
	TO extends NestedSubjectTypeOptions,
> extends _CustomNestedSubject<TO> {
	constructor(initialValue: TO['Input']) {
		super({ initialValue })
	}
}
