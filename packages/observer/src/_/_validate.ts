// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar'

import type { NestedSubjectDependencies } from '~'

/** @internal */
export function _validate(options: {
	diContext?: NestedSubjectDependencies | undefined
	schemable?: $$Schemable
	value: unknown
}) {
	if (options.diContext && options.schemable !== undefined)
		return options.diContext.schema(options.schemable).validate(options.value)
	else return options.value
}
