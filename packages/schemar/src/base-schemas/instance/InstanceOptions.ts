// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface InstanceOptions extends SchemaOptions {
	Constructor: abstract new (...args: any[]) => object
	// Output: object
	// Input: object
}

export declare namespace InstanceOptions {
	export interface Default extends SchemaOptions.Default {
		Constructor: abstract new (...args: any[]) => object

		Output: object
		Input: object
	}
}
