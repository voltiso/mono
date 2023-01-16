// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface NeverOptions extends SchemaOptions {
	// Output: never
	// Input: never
}

export declare namespace NeverOptions {
	export interface Default extends SchemaOptions.Default {
		Output: never
		Input: never
	}
}
