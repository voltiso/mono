// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type { GetSchema$ByName, SCHEMA_NAME, SchemaOptions } from '~'

export type DefineSchema$<
	This extends { readonly [Voltiso.Schemar.SCHEMA_NAME]: unknown },
	NewPartialOptions extends Partial<SchemaOptions>,
> = GetSchema$ByName<This[SCHEMA_NAME], NewPartialOptions>

export type OverrideSchema$<
	This extends { readonly [Voltiso.Schemar.SCHEMA_NAME]: unknown },
	PartialOptions,
	NewPartialOptions,
> = DefineSchema$<This, $Override_<PartialOptions, NewPartialOptions>>

export type OverrideSchema$WithOmit<
	This extends { readonly [Voltiso.Schemar.SCHEMA_NAME]: unknown },
	PartialOptions extends object,
	NewPartialOptions,
	FieldsToOmit extends string,
> = PartialOptions extends any
	? DefineSchema$<
			This,
			$Override_<Omit<PartialOptions, FieldsToOmit>, NewPartialOptions>
		>
	: never
