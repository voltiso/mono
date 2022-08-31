// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NestedSubject } from '@voltiso/observer/dist/cjs/NestedSubject'
import type { SchemableObjectLike, Type } from '@voltiso/schemar.types'

import type { UseFormValidators } from './Validators'

export type UseFormOptions<S extends SchemableObjectLike> = {
	data: NestedSubject<S>
	state: NestedSubject<>
	validators?: UseFormValidators<Type<S>> | undefined
	// onBeforeSubmit?: () => Promise<void> | void
	// onCancelSubmit?: () => Promise<void> | void
	onSubmit: () => Promise<void> | void
	// onError?: (error: Error) => Promise<void> | void
}
