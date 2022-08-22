// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTag } from '~/DocTypes'

import type { NewFields } from './_/NewFields'
import type { DocConstructorImpl } from './DocConstructor'
import type { DocTI } from './DocTI'

// eslint-disable-next-line etc/no-misused-generics
export function DocCall<TI extends DocTI, Tag extends DocTag>(tag: Tag): never

// eslint-disable-next-line etc/no-misused-generics
export function DocCall<TI extends DocTI, F extends NewFields>(fields: F): never

export function DocCall(
	this: typeof DocConstructorImpl,
	arg: DocTag | NewFields,
) {
	// eslint-disable-next-line no-useless-call
	if (typeof arg === 'string') return this.tag.call(this, arg) as never
	else return this.fields(arg) as never
}
