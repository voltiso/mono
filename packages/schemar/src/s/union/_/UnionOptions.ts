import { AtLeast2 } from '@voltiso/ts-util/array'
import {
	defaultSchemaOptions,
	RootSchemable,
	SchemaOptions,
} from '../../../schema'

export interface UnionOptions extends SchemaOptions {
	schemas: AtLeast2<RootSchemable>
}

export const defaultUnionOptions = {
	...defaultSchemaOptions,
}

export type DefaultUnionOptions = typeof defaultUnionOptions
