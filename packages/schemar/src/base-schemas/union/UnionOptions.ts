// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '~'
import type { SchemaOptions } from '~/Schema/options'

export interface UnionOptions extends SchemaOptions {
	schemas: $$Schemable[]
}

export declare namespace UnionOptions {
	export interface Default extends SchemaOptions.Default {
		schemas: $$Schemable[]
	}
}
