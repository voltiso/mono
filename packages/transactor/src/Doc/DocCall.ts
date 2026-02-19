// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTag } from '~/DocTypes'
import { ANY_DOC } from '~/DocTypes'

import type { DocConstructorImpl } from '../DocConstructor'
import type { $$PartialDocOptions } from './_/NewFields'
import type { DocTI } from './DocTI'

export function DocCall<TI extends DocTI, Tag extends DocTag | ANY_DOC>(
	tag: Tag,
): never

export function DocCall<TI extends DocTI, F extends $$PartialDocOptions>(
	fields: F,
): never

export function DocCall(
	this: typeof DocConstructorImpl,
	arg: DocTag | ANY_DOC | $$PartialDocOptions,
): never {
	if (typeof arg === 'string' || arg === ANY_DOC)
		// eslint-disable-next-line no-useless-call
		return this.tag.call(this, arg as never) as never
	else {
		return this.with(arg as never) as never
	}
}
