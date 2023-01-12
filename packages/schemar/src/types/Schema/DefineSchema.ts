// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Omit, $Override_ } from '@voltiso/util'

import type { GetSchemaByName, SCHEMA_NAME, SchemaOptions } from '~'

export type DefineSchema<
	This extends { readonly [SCHEMA_NAME]: unknown },
	NewPartialOptions extends Partial<SchemaOptions>,
> = GetSchemaByName<This[SCHEMA_NAME], NewPartialOptions>

export type OverrideSchema<
	This extends { readonly [SCHEMA_NAME]: unknown },
	PartialOptions,
	NewPartialOptions,
> = DefineSchema<This, $Override_<PartialOptions, NewPartialOptions>>

export type OverrideSchemaWithOmit<
	This extends { readonly [SCHEMA_NAME]: unknown },
	PartialOptions extends object,
	NewPartialOptions,
	FieldsToOmit extends string,
> = DefineSchema<
	This,
	$Override_<$Omit<PartialOptions, FieldsToOmit>, NewPartialOptions>
>
