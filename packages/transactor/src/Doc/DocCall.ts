// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTag } from '../DocTypes.js'
import type { NewFields } from './_/NewFields.js'
import type { DocConstructor_ } from './DocConstructor'
import type { IDocTI } from './DocTI.js'

// eslint-disable-next-line etc/no-misused-generics
export function DocCall<TI extends IDocTI, Tag extends DocTag>(tag: Tag): never

// eslint-disable-next-line etc/no-misused-generics
export function DocCall<TI extends IDocTI, F extends NewFields>(
	fields: F,
): never

export function DocCall(this: typeof DocConstructor_, arg: DocTag | NewFields) {
	// eslint-disable-next-line no-useless-call
	if (typeof arg === 'string') return this.tag.call(this, arg) as never
	else return this.fields(arg) as never
}
