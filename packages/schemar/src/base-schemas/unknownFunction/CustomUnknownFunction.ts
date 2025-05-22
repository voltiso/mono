// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomSchema,
	CustomSchema$,
	SCHEMA_NAME,
	UnknownFunctionOptions,
} from '~'

//

export interface CustomUnknownFunction<
	O extends Partial<UnknownFunctionOptions>,
> extends CustomSchema<O> {
	[SCHEMA_NAME]: 'UnknownFunction'

	readonly [Voltiso.BASE_OPTIONS]: UnknownFunctionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownFunctionOptions.Default
}

//

export interface CustomUnknownFunction$<
	O extends Partial<UnknownFunctionOptions>,
> extends CustomSchema$<O> {
	[SCHEMA_NAME]: 'UnknownFunction'

	readonly [Voltiso.BASE_OPTIONS]: UnknownFunctionOptions
	readonly [Voltiso.DEFAULT_OPTIONS]: UnknownFunctionOptions.Default

	//

	get Final(): CustomUnknownFunction<O>
}
