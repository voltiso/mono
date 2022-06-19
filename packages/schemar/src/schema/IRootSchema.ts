import { ISchema } from './ISchema'
import { SchemaOptions } from './SchemaOptions'

export type IRootSchema = ISchema<
	SchemaOptions & { optional: false; readonly: false; default: undefined }
>
