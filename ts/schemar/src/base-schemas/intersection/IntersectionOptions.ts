// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, SchemaOptions } from '~'

export interface IntersectionOptions extends SchemaOptions {
	schemas: $$Schemable[]
}

export declare namespace IntersectionOptions {
	export interface Default extends SchemaOptions.Default {
		schemas: $$Schemable[]
	}
}
