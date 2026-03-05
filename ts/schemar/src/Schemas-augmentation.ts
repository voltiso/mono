// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Omit } from '@voltiso/util'

import type {
	CustomAny$,
	CustomArray as CustomArray$,
	CustomBigint$,
	CustomBoolean$,
	CustomFunction$,
	CustomInstance$,
	CustomLiteral$,
	CustomNever$,
	CustomNonNullish$,
	CustomNumber$,
	CustomObject$,
	CustomRecord$,
	CustomSchemaInferrer$,
	CustomString$,
	CustomTuple$,
	CustomUnion$,
	CustomUnknown$,
	CustomUnknownFunction$,
	CustomUnknownLiteral$,
	CustomUnknownObject$,
	CustomUnknownRecord$,
	CustomUnknownSymbol$,
	CustomVoid$,
	SchemaOptions,
} from '~'

/** Extend using Module Augmentation */
export interface Schemas<
	O extends Partial<SchemaOptions> & { Output?: any; Input?: any } = {},
> {
	// TypeOnly: CustomTypeOnly<O>

	SchemaInferrer: CustomSchemaInferrer$<O>

	Never: CustomNever$<$Omit<O, 'Output' | 'Input'>>
	Void: CustomVoid$<O>
	Any: CustomAny$<O>
	Unknown: CustomUnknown$<O>

	NonNullish: CustomNonNullish$<O>

	String: CustomString$<O>
	Number: CustomNumber$<O>
	Bigint: CustomBigint$<O>
	Boolean: CustomBoolean$<O>
	UnknownSymbol: CustomUnknownSymbol$<O>

	Literal: CustomLiteral$<O>
	UnknownLiteral: CustomUnknownLiteral$<O>

	Instance: CustomInstance$<O>

	Function: CustomFunction$<O>
	UnknownFunction: CustomUnknownFunction$<O>

	Object: CustomObject$<O>
	UnknownObject: CustomUnknownObject$<O>

	Record: CustomRecord$<O>
	UnknownRecord: CustomUnknownRecord$<O>

	Array: CustomArray$<O>
	Tuple: CustomTuple$<O>

	Union: CustomUnion$<O>
}
