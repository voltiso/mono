// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'

import { schemaDeleteIt } from '../Ref/_/applySchema'

export * from './intrinsicFields'
export * from './ref'
export * from './types'

export const userId = s.string.regex(
	/^[\dA-Za-z]{28}$/u,
	'userId must be 28 alphanumeric characters',
)

export const autoId = s.string.regex(
	/^[\dA-Za-z]{20}$/u,
	'autoId must be 20 alphanumeric characters',
)

export const timestamp = s.instance(Date)

export const deleteIt = s.symbol(schemaDeleteIt)
