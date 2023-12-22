// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar'

import type { SubjectTreeOptions } from '~'

/** @internal */
export function _validate(options: {
	dependencies?: SubjectTreeOptions.Dependencies | undefined
	schemable?: $$Schemable
	value: unknown
}) {
	if (options.dependencies && options.schemable !== undefined) {
		return options.dependencies
			.inferSchema(options.schemable)
			.validate(options.value)
	} else {
		return options.value
	}
}
