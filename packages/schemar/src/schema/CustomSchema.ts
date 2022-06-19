import { Union } from '../s/union'
import { IRootSchema } from './IRootSchema'
import { ISchema } from './ISchema'
import { SchemaOptions } from './SchemaOptions'

export interface CustomSchema<O extends SchemaOptions> extends ISchema<O> {
	or<Other extends IRootSchema>(other: Other): Or<this, Other>
}

type Or<
	This extends ISchema,
	Other extends IRootSchema
> = This extends IRootSchema ? Union<[This, Other]> : never
