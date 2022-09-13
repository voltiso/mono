// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemableLike } from '@voltiso/schemar.types'

import type { ObserverDiContext } from '~'

/** @internal */
export function _validate(options: {
	diContext?: ObserverDiContext | undefined
	schemable?: SchemableLike
	value: unknown
}) {
	if (options.diContext && typeof options.schemable !== 'undefined')
		return options.diContext.schema(options.schemable).validate(options.value)
	else return options.value
}
