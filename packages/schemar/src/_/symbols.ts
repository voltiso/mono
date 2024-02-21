// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable es-x/no-global-this */

// ! real symbols are troublesome - they break the lib if it's loaded in multiple copies

export type SCHEMA_NAME = { readonly symbol: unique symbol }['symbol']
// export const SCHEMA_NAME: SCHEMA_NAME = `SchemarSymbol(SCHEMA_NAME)` as never // Symbol('SCHEMA_NAME') as never
// export const SCHEMA_NAME: SCHEMA_NAME = Symbol('SCHEMA_NAME') as never

// globalThis.voltisoSchemar ??= {}

//

export type EXTENDS = { readonly symbol: unique symbol }['symbol']
// export const EXTENDS: EXTENDS = `SchemarSymbol(EXTENDS)` as never // Symbol('EXTENDS') as never
// export const EXTENDS: EXTENDS = Symbol('EXTENDS') as never

declare global {
	interface VoltisoSchemar {
		readonly SCHEMA_NAME: SCHEMA_NAME
		readonly EXTENDS: EXTENDS
	}

	// eslint-disable-next-line vars-on-top, no-var
	var voltisoSchemar: VoltisoSchemar
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
globalThis.voltisoSchemar ??= {
	SCHEMA_NAME: Symbol('SCHEMA_NAME') as never,
	EXTENDS: Symbol('EXTENDS') as never,
}

export const SCHEMA_NAME: SCHEMA_NAME = globalThis.voltisoSchemar.SCHEMA_NAME
export const EXTENDS: EXTENDS = globalThis.voltisoSchemar.EXTENDS
