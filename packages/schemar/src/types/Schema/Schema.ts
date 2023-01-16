// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument } from '@voltiso/util'

import type { CustomSchema, CustomSchema$, ISchema } from '~'

//

export type Schema<T extends unknown | NoArgument = NoArgument> =
	T extends NoArgument ? ISchema : SimpleSchema<T>

export type Schema$<T extends unknown | NoArgument = NoArgument> =
	T extends NoArgument ? ISchema : SimpleSchema$<T>

//

export interface SimpleSchema<T>
	extends CustomSchema<{ Output: T; Input: T }> {}

export interface SimpleSchema$<T>
	extends CustomSchema$<{ Output: T; Input: T }> {}
